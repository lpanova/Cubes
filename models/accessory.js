//create Accsessory
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const AccessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  description: {
    type: String,
    regrequireduired: true,
    maxlength: 2000,
    minlength: 20
  },
  imageUrl: {
    type: String,
    required: true
  },
  cubes: [
    {
      type: ObjectId,
      ref: 'Cube'
    }
  ]
});

module.exports = mongoose.model('Accessory', AccessorySchema);
