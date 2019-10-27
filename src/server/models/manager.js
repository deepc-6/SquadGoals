const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ManagerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid!');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error('Please enter your password!');
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
  },
);

// verify user credentials from database
ManagerSchema.statics.checkValidCredentials = async (email, password) => {
  const user = await Manager.findOne({ email });
  if (!user) {
    throw new Error('No such user exists');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password did not match');
  }
  return user;
};

// generate new authorization token
ManagerSchema.methods.newAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '7 days',
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

ManagerSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

// hash the plain text password before saving
ManagerSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Manager = mongoose.model('Manager', ManagerSchema);

module.exports = Manager;
