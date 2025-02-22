import { Button } from "../../components/ui/button";
import aImage from '../../assets/a.png';
import bImage from '../../assets/b.png';
import cImage from '../../assets/c.png';
import dImage from '../../assets/d.png';
import { MorphingText } from "../../components/magicui/morphing-text";
import { NumberTicker } from "../..//components/magicui/number-ticker";

import { TypingAnimation } from "../../components/magicui/typing-animation";
import { TextReveal } from "../../components/magicui/text-reveal";
import { MarqueeDemo } from "../../components/ui/marquee_demo"; // Adjust path as needed


import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Divide,
  Heater,
  Images,
  Shirt,
  Scale,
  ShoppingBasket,
  BookOpen,
  WashingMachine,
  BookA,
  Microscope,
  Tally1, Tally2, Tally3
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop/product-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { useToast } from "../../hooks/use-toast";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import { getFeatureImages } from "../../store/common-slice";

const categoriesWithIcon = [
  { id: "Law", label: "Law", icon: Scale },
  { id: "Maths", label: "Maths", icon: Divide },
  { id: "Research", label: "Research", icon: BookA },
  { id: "Science", label: "Science", icon: Microscope },
  { id: "Novel", label: "Novel", icon: BookOpen },
];

const texts1 = [
  "FAQ",
  "FAQ",
  "FAQ",
  "FAQ",
  "FAQ",
  "FAQ",
  "FAQ",
  "FAQ",
  "FAQ",
];
const texts2 = [
  "FLOOR WISE",
  "FLOOR WISE",
  "FLOOR WISE",
  "FLOOR WISE",
  "FLOOR WISE",
  "FLOOR WISE",
  "FLOOR WISE",
];
const texts3 = [
  "TOP BOOKS",
  "TOP BOOKS",
  "TOP BOOKS",
  "TOP BOOKS",
  "TOP BOOKS",
  "TOP BOOKS",

  "TOP BOOKS",
];

const texts0 = [
  "SUBJECT WISE",
  "SUBJECT WISE",

  "SUBJECT WISE",
  "SUBJECT WISE",
  "SUBJECT WISE",
  "SUBJECT WISE",
  "SUBJECT WISE",
  "SUBJECT WISE"
];
const brandsWithIcon = [
  { id: "1st Floor", label: "1st Floor", icon: Tally1 },
  { id: "2nd Floor", label: "2nd Floor", icon: Tally2 },
  { id: "3rd Floor", label: "3rd Floor", icon: Tally3 },
  { id: "Ground Floor", label: "Ground Floor", icon: Airplay },

];
const sliderImages = [aImage, bImage,cImage, dImage];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[600px] overflow-hidden rounded-lg shadow-lg">
  {/* Image Slider */}
  <div
    className="flex transition-transform duration-300 ease-in-out" // Faster transition
    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
  >
    {sliderImages.map((image, index) => (
      <img
        key={index}
        src={image}
        className="w-full h-full object-cover flex-shrink-0"
        alt={`Slide ${index + 1}`}
      />
    ))}
  </div>

  {/* Previous Button */}
  <button
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-gray-300 transition duration-200"
    onClick={() =>
      setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
    }
  >
    <ChevronLeftIcon className="w-8 h-8 text-gray-800" />
  </button>

  {/* Next Button */}
  <button
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-gray-300 transition duration-200"
    onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
  >
    <ChevronRightIcon className="w-8 h-8 text-gray-800" />
  </button>

  {/* Indicator Dots */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {sliderImages.map((_, index) => (
      <button
        key={index}
        className={`h-3 w-3 rounded-full transition-all ${
          currentSlide === index ? "bg-white scale-110" : "bg-gray-400"
        }`}
        onClick={() => setCurrentSlide(index)}
      />
    ))}
  </div>
</div>

      <section className="flex flex-row items-center justify-center gap-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg">
  <div className="flex flex-col items-center">
    <NumberTicker
      value={79}
      className="text-6xl font-bold text-blue-600 dark:text-blue-400"
    />
    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
      Total Seats Available
    </p>
  </div>

  <div className="flex flex-col items-center">
    <NumberTicker
      value={4}
      className="text-6xl font-bold text-green-600 dark:text-green-400"
    />
    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
      Total Discussion Rooms Available
    </p>
  </div>
</section>

      {/* Shop by Category Section */}
      <section className="py-12 bg-[#D4A373]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
          <TypingAnimation>SUBJECT WISE</TypingAnimation>

          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer bg-white hover:shadow-xl hover:scale-105 transition-transform p-4 rounded-lg"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-[#D4A373]" />
                  <span className="font-bold text-gray-800">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
     
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8"><TypingAnimation>FAQ</TypingAnimation></h2>
          <MarqueeDemo />
        </div>
      </section>
      {/* Shop by Brand Section */}
      <section className="py-12 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8"><TypingAnimation>FLOOR WISE</TypingAnimation></h2>
          <div className="grid   grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer bg-white hover:shadow-xl hover:scale-105 transition-transform p-4 rounded-lg"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-[#D4A373]" />
                  <span className="font-bold text-gray-800">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
          <TypingAnimation>BOOKS</TypingAnimation>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;