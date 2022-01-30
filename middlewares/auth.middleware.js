const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Op } = require("sequelize");

// require('crypto').randomBytes(64).toString('hex')

// Models
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./config.env" });

exports.protectSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Invalid session!", 401));
  }

  // Validate token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: decoded.id, status: "available" },
  });

  if (!user) {
    return next(new AppError("User session is no longer valid", 401));
  }

  // Add data to req object
  req.currentUser = user;

  next();
});

exports.protectProductOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  console.log(currentUser);

  // Find product by id
  // SELECT * FROM products WHERE status = 'active' OR status = 'soldOut'
  const product = await Product.findOne({
    where: { id, status: { [Op.or]: ["active", "soldOut"] } },
  });

  if (!product) {
    return next(new AppError("No product found", 404));
  }

  // Validate currentUser id with the given product
  if (product.userId !== currentUser.id) {
    return next(new AppError("You do not own this product", 401));
  }

  req.product = product;
  next();
});

exports.protectOwnerData = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  if (!id) {
    return next(new AppError("User not found", 404));
  }

  // console.log(user.id);
  // console.log(currentUser);
  if (id !== currentUser.id) {
    return next(new AppError("You do not own this user", 401));
  }

  next();
});
