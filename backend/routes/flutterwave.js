const express = require('express');
const router = express.Router();
const flutterwavePayment = require('../controllers/flutterwave');

router.route('/payment').post(flutterwavePayment);

module.exports = router;
