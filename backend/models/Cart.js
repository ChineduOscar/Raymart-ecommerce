const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: [true, 'Please provide user id'],
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
