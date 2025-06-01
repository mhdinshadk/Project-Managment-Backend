# Product Management Application

A MERN stack application for managing products, categories, sub-categories, and wishlists.

## Features
- User authentication (signup and login)
- Add and manage categories and sub-categories
- Add products with multiple variants (RAM, price, qty) and images
- Edit products (including updating images)
- Display products with pagination
- Search products by name
- Filter products by sub-category
- Wishlist functionality

## Setup Instructions
1. *Backend*:
   - Navigate to backend folder
   - Run npm install
   - Create a .env file with PORT, MONGO_URI, and JWT_SECRET
   - Ensure uploads folder exists in backend
   - Run npm start
2. *Frontend*:
   - Navigate to frontend folder
   - Run npm install
   - Run npm start

## Technologies
- MongoDB, Express.js, React, Node.js
- JWT for authentication
- Axios for API calls
- Multer for image uploads

## Notes
- Ensure MongoDB is running locally or provide a valid MongoDB URI.
- Image uploads are stored in backend/uploads and served at /uploads.
- The application is hosted at [your-hosting-url] (if hosted).
