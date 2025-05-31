const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.userId }).populate('products');
    res.json(wishlist || { products: [] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ user: req.user.userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
      await wishlist.save();
    }
    res.json(wishlist || { products: [] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};