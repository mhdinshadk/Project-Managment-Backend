const express = require('express');
const { addCategory, addSubCategory, getCategories, getSubCategories } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/category', authMiddleware, addCategory);
router.post('/subcategory', authMiddleware, addSubCategory);
router.get('/categories', getCategories);
router.get('/subcategories', getSubCategories);

module.exports = router;