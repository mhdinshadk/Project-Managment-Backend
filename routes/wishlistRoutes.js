const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/wishlist', authMiddleware, addToWishlist);
router.get('/wishlist', authMiddleware, getWishlist);
router.delete('/wishlist/:productId', authMiddleware, removeFromWishlist);

module.exports = router;