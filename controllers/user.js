const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const privatekey = 'Cube';

const saveUser = async (req, res) => {
  const { username, password } = req.body;

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = new User({
    username,
    password: hashedPassword
  });

  const userObject = await user.save();

  const token = jwt.sign(
    { userID: user._id, userName: userObject.username },
    privatekey
  );

  res.cookie('aid', token);
  return true;
};

const verifyUser = async (req, res) => {
  const { username, password } = req.body;

  //get user by username
  const user = await User.findOne({ username });

  const status = await bcrypt.compare(password, user.password);
  if (status) {
    const token = jwt.sign(
      { userID: user._id, userName: user.username },
      privatekey
    );
    res.cookie('aid', token);
  }
  return status;
};

const checkoutAuthentication = (req, res, next) => {
  const token = req.cookies['aid'];
  if (!token) {
    return res.redirect('/');
  }
  try {
    jwt.verify(token, privatekey);
    next();
  } catch (e) {
    res.redirect('/');
  }
};

const checkoutAuthenticationJSON = (req, res, next) => {
  const token = req.cookies['aid'];
  if (!token) {
    return res.json({
      Error: 'Not authenticated!'
    });
  }
  try {
    jwt.verify(token, privatekey);
    next();
  } catch (e) {
    res.json({
      Error: 'Not authenticated!'
    });
  }
};

const getUserStatus = (req, res, next) => {
  const token = req.cookies['aid'];
  if (!token) {
    req.isLoggedIn = false;
  }
  try {
    jwt.verify(token, privatekey);
    req.isLoggedIn = true;
  } catch (e) {
    req.isLoggedIn = false;
  }
  next();
};

const checkGuestAccess = (req, res, next) => {
  const token = req.cookies['aid'];
  if (token) {
    return res.redirect('/');
  }
  next();
};

const logout = (req, res) => {
  const token = req.cookies['aid'];
};

module.exports = {
  saveUser,
  verifyUser,
  checkoutAuthentication,
  checkoutAuthenticationJSON,
  checkGuestAccess,
  getUserStatus
};
