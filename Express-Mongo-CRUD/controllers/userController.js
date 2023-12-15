const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// get all users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}); /// empty curly vaneko get all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get a user
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await User.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// create a user
const createUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await User.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404);
      throw new Error(`Cannot find the user with id: ${id}`);
    }
    const updatedProduct = await User.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await User.findByIdAndDelete(id);
    if (!product) {
      res.status(404);
      throw new Error(`Cannot find the user with id: ${id}`);
    }
    res
      .status(200)
      .json({ message: `Successfully deleted the user with id: ${id}` });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
