//create user

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  repeatPassword: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('User', UserSchema);
