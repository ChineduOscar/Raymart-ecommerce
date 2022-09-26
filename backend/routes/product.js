const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require('../controllers/product');
const { verifyTokenAsAdmin } = require('../middleware/authentication');

router.route('/').post(verifyTokenAsAdmin, createProduct).get(getAllProducts);
router
  .route('/:id')
  .patch(verifyTokenAsAdmin, updateProduct)
  .delete(verifyTokenAsAdmin, deleteProduct);
router.route('/find/:id').get(getProduct);

module.exports = router;
