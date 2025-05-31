const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  ram: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  variants: [variantSchema],
  images: [{ type: String }],
});

module.exports = mongoose.model('Product', productSchema);