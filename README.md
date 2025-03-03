# Library Management System

## Contributors

- **Dipsita Rout**
- **Siddharth Seth**

## Overview

The **Library Management System** is a full-stack web application that allows users to manage books efficiently. It features authentication, separate admin and user access, and integrates RFID/barcode scanning for book management.

## Features

### Admin
- View all books
- Add, remove, and modify books
- Add books using RFID/barcodes

### User
- Borrow books
- Check book availability online
- Check if a discussion room is empty
- Search for books using RFID/barcode or name

## Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)

## Libraries Used

```json
{
  "bcryptjs": "^2.4.3",
  "cloudinary": "^2.5.1",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "fs-extra": "^11.3.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.10.0",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.10.0",
  "nodemon": "^3.1.9",
  "path": "^0.12.7",
  "puppeteer": "^24.2.1"
}
```

## Setup & Installation

### 1. Clone the Repository

```sh
git clone https://github.com/your-repo/library-management-system.git
cd library-management-system
```

### 2. Install Dependencies

#### Backend
```sh
cd server
npm install
```

#### Frontend
```sh
cd client
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `server` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4. Run the Application

#### Start the Backend Server
```sh
cd server
npm run dev
```

#### Start the Frontend Server
```sh
cd client
npm start
```

### 5. Access the Application

Once both servers are running, open your browser and visit:

```
http://localhost:3000
```



