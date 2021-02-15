//create Cube
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const CubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
    // match: [/^[A-Za-z0-9]+$/, 'Cube name is not valid!']
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    minlength: 20
    // match: [/^[A-Za-z0-9]+$/, 'Cube description is not valid!']
  },
  imageUrl: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  accessories: [
    {
      type: ObjectId,
      ref: 'Accessory'
    }
  ],
  creatorId: {
    type: ObjectId,
    ref: 'User'
  }
});

// CubeSchema.path('imageUrl').validate(function (url) {
//   return url.includes('http') || url.includes('https');
// }, 'Image url is not valid!');

module.exports = mongoose.model('Cube', CubeSchema);
