const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
} = require('../controllers/order');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAsAdmin,
} = require('../middleware/authentication');

router
  .route('/')
  .post(verifyToken, createOrder)
  .get(verifyTokenAsAdmin, getAllOrders);
router
  .route('/:id')
  .patch(verifyTokenAsAdmin, updateOrder)
  .delete(verifyTokenAsAdmin, deleteOrder);
router.route('/find/:id').get(verifyTokenAndAuthorization, getOrder);
router.route('/income').get(verifyTokenAsAdmin, getMonthlyIncome);

module.exports = router;
