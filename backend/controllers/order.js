const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

//create order
const createOrder = async (req, res) => {
  const order = await Order.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ order });
};

//update order
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findByIdAndUpdate({ _id: orderId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    throw new NotFoundError(`No order with id ${orderId}`);
  }
  res.status(StatusCodes.CREATED).json({ order });
};

//delete order
const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findByIdAndDelete({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id ${orderId}`);
  }
  res.status(StatusCodes.OK).json({ order });
};

//get single order
const getOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findById({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id ${orderId}`);
  }
  res.status(StatusCodes.OK).json({ order });
};

//get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders });
};

//get monthly income
const getMonthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
        ...(productId && {
          products: { $elemMatch: { productId } },
        }),
      },
    },
    {
      $project: {
        month: { $month: '$createdAt' },
        sales: '$amount',
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$sales' },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ income });
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
};
