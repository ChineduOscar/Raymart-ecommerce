const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
    },
    brand: {
      type: String,
    },
    images: {
      type: String,
      required: [true, 'Please provide product image'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    oldPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
