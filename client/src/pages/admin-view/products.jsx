import { Button } from "../../components/ui/button";
import { Fragment, useState, useEffect } from "react";
import { Sheet, SheetHeader, SheetContent, SheetTitle } from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addProductFormElements } from "../../components/config/index";
import ProductImageUpload from '../../components/admin-view/image-upload';
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "../../store/admin/products-slice";
import { useToast } from "../../hooks/use-toast";
import AdminProductTile from "../../components/admin-view/product-tile";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    Author: '',
    category: '',
    brand: '',
    totalStock: '',
    link: '',  // ✅ Booking Link
    productUrl: '' // ✅ New Field: Product URL (From Schema)
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

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    function handleDelete(productId) {
        dispatch(deleteProduct(productId)).then((data) => {
            if (data?.payload?.success) {
                toast({ title: "Product deleted successfully" });
                dispatch(fetchAllProducts());
            } else {
                toast({ title: "Failed to delete product", variant: "destructive" });
            }
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    function onSubmit(event) {
        event.preventDefault();
        const productData = { ...formData, image: uploadedImageUrl };

        if (currentEditedId !== null) {
            dispatch(editProduct({ id: currentEditedId, formData: productData })).then((data) => {
                if (data?.payload?.success) {
                    toast({ title: "Product updated successfully" });
                    dispatch(fetchAllProducts());
                    resetForm();
                } else {
                    toast({ title: "Failed to update product", variant: "destructive" });
                }
            });
        } else {
            dispatch(addNewProduct(productData)).then((data) => {
                if (data?.payload?.success) {
                    toast({ title: "Product added successfully" });
                    dispatch(fetchAllProducts());
                    resetForm();
                } else {
                    toast({ title: "Failed to add product", variant: "destructive" });
                }
            });
        }
    }

    function resetForm() {
        setFormData(initialFormData);
        setCurrentEditedId(null);
        setImageFile(null);
        setUploadedImageUrl("");
        setOpenCreateProductsDialog(false);
    }

    return (
        <Fragment>
            <div className="mb-5 flex justify-end w-full">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
            </div>
            <div className="gap-4 grid md:grid-cols-3 lg:grid-cols-4">
                {productList?.length > 0 ? productList.map((productItem) => (
                    <div key={productItem._id} className="border rounded-lg p-4 shadow-md">
                        <AdminProductTile
                            setFormData={setFormData}
                            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                            setCurrentEditedId={setCurrentEditedId}
                            product={productItem}
                            handleDelete={handleDelete}
                        />
                        {/* ✅ Stock Left */}
                        <p className="text-sm text-gray-600 mt-2">Stock Left: <b>{productItem.totalStock}</b></p>

                        {/* ✅ Book Now Button */}
                        {productItem.link && (
                            <Button
                                className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => window.open(productItem.link, "_blank")}
                            >
                                Book Now
                            </Button>
                        )}

                        {/* ✅ View Product Button (Links to Product URL) */}
                        {productItem.productUrl && (
                            <Button
                                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => window.open(productItem.productUrl, "_blank")}
                            >
                                View Product
                            </Button>
                        )}
                    </div>
                )) : <p className="text-center text-gray-500 col-span-3">No products available.</p>}
            </div>

            {/* Sheet Modal for Adding New Product */}
            <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
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
                           
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;
