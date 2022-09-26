const express = require('express');
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require('../controllers/user');
const {
  verifyTokenAndAuthorization,
  verifyTokenAsAdmin,
} = require('../middleware/authentication');

router.route('/').get(verifyTokenAsAdmin, getAllUsers);
router
  .route('/:id')
  .patch(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAuthorization, deleteUser);
router.route('/find/:id').get(verifyTokenAsAdmin, getUser);
router.route('/stats').get(verifyTokenAsAdmin, getUserStats);

module.exports = router;
