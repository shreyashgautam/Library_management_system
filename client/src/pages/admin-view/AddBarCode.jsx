import { useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const AddBarCode = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const [image, setImage] = useState(null);
  const [bookDetails, setBookDetails] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const barcodeReader = new BrowserMultiFormatReader();

  // 📌 Handle file upload & barcode scanning
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

        // 📌 Fetch Book Details from APIs
        const bookData = await fetchBookDetails(isbn);
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

  // 📌 Fetch Book Details
  const fetchBookDetails = async (isbn) => {
    let bookData = await fetchBookDetailsFromGoogleBooks(isbn);
    if (!bookData) bookData = await fetchBookDetailsFromOpenLibrary(isbn);
    return bookData;
  };

  // 📌 Fetch from Google Books API
  const fetchBookDetailsFromGoogleBooks = async (isbn) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const data = await response.json();

      if (!data.items || data.items.length === 0) return null;

      const book = data.items[0].volumeInfo;
      return {
        title: book.title || "No Title Available",
        authors: book.authors ? book.authors.join(", ") : "Unknown Author",
        publisher: book.publisher || "Unknown Publisher",
        publishedDate: book.publishedDate || "Unknown Date",
        isbn,
        description: book.description || "No description available.",
      };
    } catch (error) {
      console.error("Google Books API Error:", error);
      return null;
    }
  };

  // 📌 Fetch from Open Library API
  const fetchBookDetailsFromOpenLibrary = async (isbn) => {
    try {
      const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
      const data = await response.json();

      const bookKey = `ISBN:${isbn}`;
      if (!data[bookKey]) return null;

      const book = data[bookKey];
      return {
        title: book.title || "No Title Available",
        authors: book.authors ? book.authors.map((a) => a.name).join(", ") : "Unknown Author",
        publisher: book.publishers ? book.publishers.map((p) => p.name).join(", ") : "Unknown Publisher",
        publishedDate: book.publish_date || "Unknown Date",
        isbn,
        description: book.excerpts ? book.excerpts.map((e) => e.text).join(" ") : "No description available.",
      };
    } catch (error) {
      console.error("Open Library API Error:", error);
      return null;
    }
  };

  // 📌 Add book to database
  const addBookToDatabase = async (book) => {
    if (!book) return;
  
    try {
      const response = await fetch("http://localhost:5001/admin/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
  
      const data = await response.json();
  
      if (response.ok && data.message.includes("added successfully")) {  
        setSuccessMessage(`✅ "${book.title}" added successfully!`);
      } else {
        setSuccessMessage("❌ Failed to add book.");
      }
    } catch (error) {
      console.error("Add Book Failed:", error);
      setSuccessMessage("❌ Failed to add book.");
    }
  };
  

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📚 Admin - Add Books</h2>

      {/* File Upload */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload} 
        className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 cursor-pointer hover:border-blue-500 transition"
      />

      {/* Uploaded Image Preview */}
      {image && (
        <img 
          src={image} 
          alt="Uploaded Barcode" 
          className="w-48 h-48 object-cover rounded-lg border border-gray-400 shadow-lg mt-4"
        />
      )}

      {/* Barcode Data */}
      {barcodeData && (
        <p className="mt-4 text-lg font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-lg shadow-md">
          📌 Barcode Data: <span className="font-mono">{barcodeData}</span>
        </p>
      )}

      {/* Book Details Section */}
      {bookDetails.length > 0 && (
        <div className="mt-6 p-6 border rounded-lg shadow-lg bg-white w-full max-w-xl">
          <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">📖 Book Details</h3>

          {bookDetails.map((book, index) => (
            <div key={index} className="mt-4 bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="text-xl font-bold text-gray-900">{book.title}</h4>
              <p className="text-gray-700"><strong>Author(s):</strong> {book.authors}</p>
              <p className="text-gray-700"><strong>Publisher:</strong> {book.publisher}</p>
              <p className="text-gray-700"><strong>Published Year:</strong> {book.publishedDate}</p>
              <p className="text-gray-700"><strong>ISBN:</strong> {book.isbn}</p>
              <p className="text-gray-600"><strong>Description:</strong> {book.description}</p>

              {/* ADD BOOK BUTTON */}
              <button 
                onClick={() => addBookToDatabase(book)} 
                className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
              >
                ➕ ADD BOOK
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <p className="mt-4 text-lg font-semibold px-4 py-2 rounded-lg shadow-md bg-blue-100 text-blue-800">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default AddBarCode;
