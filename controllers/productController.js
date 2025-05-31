const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, subCategory, variants } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const product = new Product({
      name,
      subCategory,
      variants: JSON.parse(variants), // Parse variants if sent as string
      images,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', subCategory = '' } = req.query;
    const query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (subCategory) query.subCategory = subCategory;

    const products = await Product.find(query)
      .populate('subCategory')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments(query);
    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subCategory, variants } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : undefined;

    const updateData = {
      name,
      subCategory,
      variants: variants ? JSON.parse(variants) : undefined,
      ...(images && { images }), // Only update images if provided
    };

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('subCategory'); // populate if needed
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};