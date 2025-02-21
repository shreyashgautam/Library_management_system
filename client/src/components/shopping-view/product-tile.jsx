import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "../config/index";
import { Badge } from "../ui/badge";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  return (
    <Card className="w-full max-w-sm mx-auto border border-gray-300 shadow-lg rounded-xl transition-transform hover:scale-105">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-xl"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{product?.title}</h2>
          <p className="text-gray-600 text-sm mt-1 mb-3">{product?.description}</p> {/* ✅ Description added */}

          <div className="text-gray-600 text-sm mb-1">
            <span className="block font-semibold">Category: {product?.category}</span>
            <span className="block font-semibold">Floor: {product?.brand}</span>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex gap-2 p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed bg-gray-400">Out Of Stock</Button>
        ) : (
          <>
            <Button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Borrow
            </Button>
            {product?.onlineLink && (
              <Button
                as="a"
                href={product.onlineLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Online
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
