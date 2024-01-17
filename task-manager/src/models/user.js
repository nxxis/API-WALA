const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      // required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password must not be password');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('age must be a positive number');
        }
      },
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('provide a valid email');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// defines function that can be accessed through instance since token will be unique for each user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisisatest');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// defines a function in userModel so that it can be accessed
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!email) {
    throw new Error('email/password incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('email/password incorrect');
  }

  return user;
};

// hash the plain password
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// delete all the task associated with user when user itself is deleted
userSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
  }
);

const User = mongoose.model('User', userSchema);

User.createIndexes();

module.exports = User;
