const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

//create product
const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ product });
};

//update product
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

//delete product
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findByIdAndDelete({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

//get single product
const getProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

//get all products
const getAllProducts = async (req, res) => {
  const queryNewProducts = req.query.new;
  const queryProductCategory = req.query.category;

  let products;
  if (queryNewProducts) {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(2);
  } else if (queryProductCategory) {
    products = await Product.find({
      category: {
        $in: [queryProductCategory],
      },
    });
  } else {
    products = await Product.find({});
  }

  res.status(StatusCodes.OK).json({ products });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
