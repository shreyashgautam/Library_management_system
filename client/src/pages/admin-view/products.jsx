import { Button } from "../../components/ui/button";
import { Fragment, useState, useEffect } from "react";
import { Sheet, SheetHeader, SheetContent, SheetTitle } from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addProductFormElements } from "../../components/config/index";
import ProductImageUpload from '../../components/admin-view/image-upload'
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "../../store/admin/products-slice";
import { useToast } from "../../hooks/use-toast";

import AdminProductTile from "../../components/admin-view/product-tile";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: '',
};

function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);

    const [currentEditedId, setCurrentEditedId] = useState(null);

    const { productList } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();

    // Fetch all products when component mounts
    useEffect(() => {
        dispatch(fetchAllProducts()); // ✅ Proper invocation of fetchAllProducts
    }, [dispatch]);
    function handleDelete(getCurrentProductId) {
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
            }
        });
    }
    function isFormValid() {
        return Object.keys(formData)
            .filter((currentKey) => currentKey !== "averageReview")
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }
    // Handle form submission
    function onSubmit(event) {
        event.preventDefault();

        currentEditedId !== null
            ? dispatch(
                editProduct({
                    id: currentEditedId,
                    formData,
                })
            ).then((data) => {
                console.log(data, "edit");

                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setFormData(initialFormData);
                    setOpenCreateProductsDialog(false);
                    setCurrentEditedId(null);
                }
            })
            : dispatch(
                addNewProduct({
                    ...formData,
                    image: uploadedImageUrl,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setOpenCreateProductsDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                        title: "Product add successfully",
                    });
                }
            });
    }
    return (
        <Fragment>
            <div className="mb-5 flex justify-end w-full">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
            </div>
            <div className="gap-4 grid md:grid-cols-3 lg:grid-cols-4">
                {productList && productList.length > 0
                    ? productList.map((productItem) => (
                        <AdminProductTile
                            setFormData={setFormData}
                            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                            setCurrentEditedId={setCurrentEditedId}
                            product={productItem}
                            handleDelete={handleDelete}

                        />
                    ))
                    : null}
                {/* Product list rendering can be added here */}
            </div>

            {/* Sheet Modal for Adding New Product */}
            <Sheet open={openCreateProductsDialog} onOpenChange={() => {
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
            }} >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {
                                currentEditedId !== null ? 'Edit Product' : 'Add New Product'
                            }
                        </SheetTitle>
                        <ProductImageUpload
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadedImageUrl={uploadedImageUrl}
                            setUploadedImageUrl={setUploadedImageUrl}
                            setImageLoadingState={setImageLoadingState}
                            imageLoadingState={imageLoadingState}
                            isEditMode={currentEditedId !== null}
                        />
                    </SheetHeader>
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditedId !== null ? "Edit" : "Add"}
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;
