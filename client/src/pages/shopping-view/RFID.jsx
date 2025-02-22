import { useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const RFID = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const [image, setImage] = useState(null);
  const [bookDetails, setBookDetails] = useState([]);
  const [matchFound, setMatchFound] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const barcodeReader = new BrowserMultiFormatReader();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      setImage(reader.result);

      try {
        const result = await barcodeReader.decodeFromImageUrl(reader.result);
        const isbn = result.text;
        setBarcodeData(isbn);

        // Fetch book details from Google Books API
        const fetchBookDetailsFromGoogleBooks = async (isbn) => {
          try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            const data = await response.json();

            console.log("Google Books API Response:", data); // Debug API response

            if (!data.items || data.items.length === 0) {
              console.warn("No books found for ISBN:", isbn);
              return null;
            }

            const book = data.items[0].volumeInfo;

            return {
              title: book.title || "No Title Available",
              authors: book.authors ? book.authors.join(", ") : "Unknown Author",
              publisher: book.publisher || "Unknown Publisher",
              publishedDate: book.publishedDate || "Unknown Date",
              isbn: isbn,
              description: book.description || "No description available.",
            };
          } catch (error) {
            console.error("Google Books API Error:", error);
            return null;
          }
        };

        const bookData = await fetchBookDetailsFromGoogleBooks(isbn);
        if (bookData) {
          setBookDetails([bookData]);
        } else {
          setBookDetails([
            {
              title: "No Title Available",
              authors: "Unknown Author",
              publisher: "Unknown Publisher",
              publishedDate: "Unknown Date",
              isbn,
              description: "No description available.",
            },
          ]);
        }
      } catch (error) {
        console.error("Barcode Scan Failed:", error);
        setBarcodeData("Barcode not detected. Try again.");
      }
    };

    reader.readAsDataURL(file);
  };
  const fetchBookDetailsFromOpenLibrary = async (isbn) => {
    try {
      const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
      const data = await response.json();
  
      console.log("Open Library API Response:", data); // Debug API response
  
      const bookKey = `ISBN:${isbn}`;
      if (!data[bookKey]) {
        console.warn("No books found for ISBN:", isbn);
        return null;
      }
  
      const book = data[bookKey];
  
      return {
        title: book.title || "No Title Available",
        authors: book.authors ? book.authors.map((a) => a.name).join(", ") : "Unknown Author",
        publisher: book.publishers ? book.publishers.map((p) => p.name).join(", ") : "Unknown Publisher",
        publishedDate: book.publish_date || "Unknown Date",
        isbn: isbn,
        description: book.excerpts ? book.excerpts.map((e) => e.text).join(" ") : "No description available.",
      };
    } catch (error) {
      console.error("Open Library API Error:", error);
      return null;
    }
  };
  const fetchBookDetailsFromWorldCat = async (isbn) => {
    try {
      const response = await fetch(`https://www.worldcat.org/isbn/${isbn}?format=json`);
      const data = await response.json();
  
      console.log("WorldCat API Response:", data); // Debug API response
  
      if (!data.records || data.records.length === 0) {
        console.warn("No books found for ISBN:", isbn);
        return null;
      }
  
      const book = data.records[0];
  
      return {
        title: book.title || "No Title Available",
        authors: book.author || "Unknown Author",
        publisher: book.publisher || "Unknown Publisher",
        publishedDate: book.year || "Unknown Date",
        isbn: isbn,
        description: book.abstract || "No description available.",
      };
    } catch (error) {
      console.error("WorldCat API Error:", error);
      return null;
    }
  };
  const fetchBookDetailsFromLibraryGenesis = async (isbn) => {
    try {
      const response = await fetch(`http://gen.lib.rus.ec/json.php?ids=${isbn}&fields=*`);
      const data = await response.json();
  
      console.log("Library Genesis API Response:", data); // Debug API response
  
      if (!data || data.length === 0) {
        console.warn("No books found for ISBN:", isbn);
        return null;
      }
  
      const book = data[0];
  
      return {
        title: book.title || "No Title Available",
        authors: book.author || "Unknown Author",
        publisher: book.publisher || "Unknown Publisher",
        publishedDate: book.year || "Unknown Date",
        isbn: isbn,
        description: book.commentary || "No description available.",
      };
    } catch (error) {
      console.error("Library Genesis API Error:", error);
      return null;
    }
  };
      
  // Function to check if the book title exists in the MongoDB database
  const checkMatch = async (title) => {
    if (!title) return;

    try {
      const response = await fetch(`http://localhost:5001/products/check?title=${encodeURIComponent(title)}`);
      const data = await response.json();

      if (data.exists) {
        setMatchFound(true);
        setProductDetails(data.product); // Store Product Data
      } else {
        setMatchFound(false);
        setProductDetails(null);
      }
    } catch (error) {
      console.error("Match Check Failed:", error);
      setMatchFound(null);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Barcode Scanner</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} className="mb-4" />

      {image && (
        <div className="border p-2 rounded-lg shadow-md">
          <img src={image} alt="Uploaded Barcode" className="w-48 h-48 object-cover rounded-md" />
        </div>
      )}

      {barcodeData && (
        <p className="mt-4 text-lg font-semibold text-green-600">Barcode Data: {barcodeData}</p>
      )}

      {bookDetails.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg shadow-md w-full max-w-xl">
          <h3 className="text-xl font-semibold">Book Details</h3>
          {bookDetails.map((book, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-lg font-bold">{book.title}</h4>
              <p><strong>Author(s):</strong> {book.authors}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Published Year:</strong> {book.publishedDate}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Description:</strong> {book.description}</p>

              {/* Check Match Button */}
              <button
                onClick={() => checkMatch(book.title)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Check Match
              </button>

              {/* Show match result */}
              {matchFound !== null && (
                <p className="mt-2 font-semibold text-lg">
                  {matchFound ? (
                    <span className="text-green-600">Book Title Found ✅</span>
                  ) : (
                    <span className="text-red-600">Book Title Not Found ❌</span>
                  )}
                </p>
              )}

              {productDetails && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                  <h3 className="text-lg font-semibold">Product Details</h3>
                  <img src={productDetails.image} alt="Product" className="w-32 h-32 object-cover rounded-md" />
                  <p><strong>Category:</strong> {productDetails.category}</p>
                  <p><strong>Brand:</strong> {productDetails.brand}</p>
                  <p><strong>Stock:</strong> {productDetails.totalStock}</p>
                  <p><strong>More Info:</strong> <a href={productDetails.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a></p>
                </div>
              )}

              <hr className="my-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RFID;
