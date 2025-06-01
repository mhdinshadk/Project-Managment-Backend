Product Management Backend

Overview

This is the backend for a product management application built with Node.js, Express, and MongoDB. It provides RESTful APIs for managing products, including creating, reading, updating, and deleting products, as well as handling subcategories and user authentication. The backend supports file uploads for product images 

Tech Stack





Node.js: JavaScript runtime for server-side development.



Express: Web framework for building APIs.



MongoDB: NoSQL database for storing product and subcategory data.



Mongoose: ODM for MongoDB.



Multer: Middleware for handling file uploads.



JWT: For user authentication.



CORS: For enabling cross-origin requests.

Setup Instructions

Prerequisites





Node.js (v16 or higher)



MongoDB (local or MongoDB Atlas)



Postman (for testing APIs)

Installation





Clone the Repository:

git clone <repository-url>
cd product-management-backend



Install Dependencies:

npm install



Set Up Environment Variables: Create a .env file in the root directory with the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/product-management
JWT_SECRET=your_jwt_secret



Start the Server:

npm start

The server will run at http://localhost:5000 or the deployed URL https://project-managment-backend-r4hz.onrender.com.

API Endpoints

Update Product





Endpoint: PUT /api/product/:id



Description: Updates an existing product by ID.



Authentication: Requires a valid JWT token in the Authorization header (Bearer token).



Request:





Method: PUT



URL: /api/product/:id (e.g., /api/product/12345)



Headers:

Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data



Body (form-data):





name (text): Updated product name (e.g., "Updated HP AMD Ryzen 3").



subCategory (text): Subcategory ID (e.g., "60d21b4667d0d8992e610c85").



variants (text): JSON string of variants array (e.g., [{"_id":"60d21b4667d0d8992e610c86","ram":"8 GB","price":599.99,"qty":10},{"ram":"16 GB","price":699.99,"qty":5}]).



existingImages (text): JSON string of existing image paths to keep (e.g., ["uploads/image1.jpg"]).



images (file): New image files (up to 5, optional).



Example:

PUT /api/product/12345
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

name: Updated HP AMD Ryzen 3
subCategory: 60d21b4667d0d8992e610c85
variants: [{"_id":"60d21b4667d0d8992e610c86","ram":"8 GB","price":599.99,"qty":10},{"ram":"16 GB","price":699.99,"qty":5}]
existingImages: ["uploads/image1.jpg"]
images: <file1.jpg>, <file2.jpg>



Response:





Success (200 OK):

{
  "_id": "12345",
  "name": "Updated HP AMD Ryzen 3",
  "subCategory": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Laptops",
    "category": { "_id": "60d21b4667d0d8992e610c84", "name": "Electronics" }
  },
  "variants": [
    { "_id": "60d21b4667d0d8992e610c86", "ram": "8 GB", "price": 599.99, "qty": 10 },
    { "_id": "newVariantId", "ram": "16 GB", "price": 699.99, "qty": 5 }
  ],
  "images": ["uploads/image1.jpg", "uploads/new-image1.jpg", "uploads/new-image2.jpg"],
  "__v": 0
}



Error (400 Bad Request):

{ "error": "Please enter the product title." }



Error (401 Unauthorized):

{ "error": "Unauthorized" }



Error (404 Not Found):

{ "error": "Product not found" }

Other Endpoints





POST /api/product: Create a new product (requires authentication, file uploads).



GET /api/products: Fetch all products.



GET /api/product/:id: Fetch a single product by ID.



GET /api/subcategories: Fetch all subcategories (populated with category details).

Testing with Postman





Obtain a Token:





Send a POST /api/auth/login request with valid credentials to get a JWT token.



Example:

POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}



Test Update Product:





Use the PUT /api/product/:id endpoint as described above.



Ensure subCategory ID is valid (fetch from GET /api/subcategories).



Include valid image paths in existingImages and upload image files for images.



Verify Update:





Use GET /api/product/:id to confirm the product was updated.

Notes





Ensure MongoDB is running and the MONGO_URI in .env is correct.



The uploads/ folder must have write permissions for image uploads.



The authMiddleware validates JWT tokens, so ensure tokens are not expired.



The backend is deployed at https://project-managment-backend-r4hz.onrender.com.
