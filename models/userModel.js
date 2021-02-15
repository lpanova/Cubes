//create user

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    match: [/^[A-Za-z0-9]+$/, 'Username is not valid!']
  },
  password: {
    type: String,
    required: true
  }
  // repeatPassword: {
  //   type: String,
  //   required: false
  // }
});

module.exports = mongoose.model('User', UserSchema);
