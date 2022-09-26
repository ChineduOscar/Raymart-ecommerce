const Cart = require('../models/Cart');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

//create cart
const createCart = async (req, res) => {
  const cart = await Cart.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ cart });
};

//update cart
const updateCart = async (req, res) => {
  const { id: cartId } = req.params;

  const cart = await Cart.findByIdAndUpdate({ _id: cartId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!cart) {
    throw new NotFoundError(`No cart with id ${cartId}`);
  }
  res.status(StatusCodes.OK).json({ cart });
};

//delete cart
const deleteCart = async (req, res) => {
  const { id: cartId } = req.params;

  const cart = await Cart.findByIdAndDelete({ _id: cartId });
  if (!cart) {
    throw new NotFoundError(`No cart with id ${cartId}`);
  }
  res.status(StatusCodes.OK).json({ cart });
};

//get single cart
const getCart = async (req, res) => {
  const { id: cartId } = req.params;

  const cart = await Cart.findById({ _id: cartId });
  if (!cart) {
    throw new NotFoundError(`No cart with id ${cartId}`);
  }
  res.status(StatusCodes.OK).json({ cart });
};

//get all carts
const getAllCarts = async (req, res) => {
  const carts = await Cart.find({});
  res.status(StatusCodes.OK).json({ carts });
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
};
