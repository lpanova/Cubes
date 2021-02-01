const Accessory = require('../models/accessory');

const getAccessories = async () => {
  const accessory = await Accessory.find();
  return accessory;
};

module.exports = { getAccessories };
