const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = {
      userId: payload.userId,
      isAdmin: payload.isAdmin,
    };
    console.log(req.user);
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

/* verify that it is either a user or an admin*/
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userId === req.params.id || req.user.isAdmin) {
      next();
    } else {
      throw new UnauthenticatedError('You are not allowed to do that!');
    }
  });
};

/* verify that it is an admin */
const verifyTokenAsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new UnauthenticatedError('You are not allowed to do that!');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAsAdmin,
};
