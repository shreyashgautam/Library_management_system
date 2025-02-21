import ProductDetailsDialog from "../../components/shopping-view/product-details";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { Input } from "../../components/ui/input";
import { useToast } from "../../hooks/use-toast";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { fetchProductDetails } from "../../store/shop/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "../../store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productList, productDetails } = useSelector((state) => state.shoppingProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  // Fetch search results when keyword changes
  useEffect(() => {
    if (keyword.trim().length > 3) {
      setSearchParams(new URLSearchParams(`?keyword=${keyword.trim()}`));
      dispatch(getSearchResults(keyword.trim()));
    } else {
      setSearchParams(new URLSearchParams(""));
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch]);

  // Debugging: Log search results
  useEffect(() => {
    console.log("Search results:", searchResults);
  }, [searchResults]);

  // Handle adding to cart
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!user?.id) {
      toast({
        title: "Please log in to add items to the cart",
        variant: "destructive",
      });
      return;
    }

    let getCartItems = cartItems?.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({
          title: "Product added to cart",
        });
      }
    });
  }

  // Fetch product details and open dialog
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId)).then((data) => {
      if (data?.payload) {
        setOpenDetailsDialog(true);
      }
    });
  }

  // Use search results if searching, otherwise show productList
  const displayedProducts = keyword.trim().length > 3 ? searchResults : productList;

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>

      {/* No results message */}
      {keyword.trim().length > 3 && searchResults.length === 0 ? (
        <h1 className="text-5xl font-extrabold text-center">No result found!</h1>
      ) : null}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.length > 0 &&
          displayedProducts.map((productItem) => (
            <ShoppingProductTile
              key={productItem._id}
              handleGetProductDetails={handleGetProductDetails}
              product={productItem}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>

      {/* Product Details Dialog */}
      {productDetails && (
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      )}
    </div>
  );
}

export default SearchProducts;
