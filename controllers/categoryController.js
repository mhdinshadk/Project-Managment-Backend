const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body; // ✅ Use 'category' to match frontend
    const subCategory = new SubCategory({ name, category }); // ✅ Create with 'category'
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate('category');
    res.json(subCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
