const Flutterwave = require('flutterwave-node-v3');
const { StatusCodes } = require('http-status-codes');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const flutterwaveController = async (req, res) => {
  const { total } = req.body;

  try {
    const payload = {
      amount: total,
      currency: 'NGN',
    };
    const response = await flw.Transaction.fee(payload);
    res.status(StatusCodes.OK).json(response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = flutterwaveController;
