const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
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
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
