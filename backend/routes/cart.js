const express = require('express');
const router = express.Router();
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require('../controllers/cart');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAsAdmin,
} = require('../middleware/authentication');

router
  .route('/')
  .post(verifyToken, createCart)
  .get(verifyTokenAsAdmin, getAllCarts);
router
  .route('/:id')
  .patch(verifyTokenAndAuthorization, updateCart)
  .delete(verifyTokenAndAuthorization, deleteCart);
router.route('/find/:id').get(verifyTokenAndAuthorization, getCart);

module.exports = router;
