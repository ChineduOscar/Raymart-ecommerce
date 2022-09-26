const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const bcrypt = require('bcryptjs');

//update user
const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

//delete user
const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findByIdAndDelete({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

//get single user
const getUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

//get all users
const getAllUsers = async (req, res) => {
  const queryNewUsers = req.query.new;
  const users = queryNewUsers
    ? await User.find({}).sort({ _id: -1 }).limit(5)
    : await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

//get monthly income
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ data });
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
};
