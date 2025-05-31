const express = require('express');
const { addProduct, getProducts, updateProduct , getSingleProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/product', authMiddleware, upload.array('images', 5), addProduct);
router.get('/products', getProducts);
router.put('/product/:id', authMiddleware, upload.array('images', 5), updateProduct);
router.get('/product/:id', getSingleProduct);

module.exports = router;