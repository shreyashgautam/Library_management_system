import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, setProductDetails } from "../../store/shop/product-slice"; 
import { useToast } from "../../hooks/use-toast";
import { addToCart } from "../../store/shop/cart-slice"; // Still using this function for borrowing

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { cartItems } = useSelector((state) => state.shopCart);

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be borrowed for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllFilteredProducts(user?.id));
        toast({
          title: "Product added to borrow list",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-10 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white rounded-lg shadow-lg">
        
        {/* 🟢 Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover rounded-lg border"
          />
        </div>

        {/* 🟢 Product Information */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{productDetails?.title}</h1>
            <p className="text-gray-600 text-lg mt-2">{productDetails?.description}</p>
            
            {/* Category & Brand */}
            <div className="mt-4 space-y-2">
              <p className="text-gray-700 font-semibold">Category: <span className="text-gray-500">{productDetails?.category}</span></p>
              <p className="text-gray-700 font-semibold">Floor: <span className="text-gray-500">{productDetails?.brand}</span></p>
            </div>
          </div>

          {/* 🟢 Buttons */}
          <div className="flex flex-col gap-4 mt-6">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full bg-gray-400 cursor-not-allowed" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-black hover:bg-black-700 text-white font-semibold py-3 rounded-lg"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                BORROW
              </Button>
            )}

            {/* 🟢 Online Button - Opens link in new tab */}
            {  (
              <a
                href={productDetails?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
                  ONLINE
                </Button>
              </a>
            )}
          </div>

          <Separator className="mt-6" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
