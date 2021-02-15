const { findById } = require('../models/cube');
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const Search = require('../models/search');
const jwt = require('jsonwebtoken');
const privatekey = 'Cube';

const saveAccessory = async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    const accessory = new Accessory({
      name,
      description,
      imageUrl
    });
    console.log(accessory);
    const saveAccessory = await accessory.save(accessory);
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error
    };
  }
};

const saveCube = async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  const token = req.cookies['aid'];
  const decodetObject = jwt.verify(token, privatekey);
  try {
    const cube = new Cube({
      name,
      description,
      imageUrl,
      difficulty: difficultyLevel,
      creatorId: decodetObject.userID
    });
    console.log(cube);
    const saveCube = await cube.save(cube);
    console.log(saveCube);
    // return saveCube;
  } catch (error) {
    return {
      error: true,
      message: error
    };
  }
};

const getAllCubes = async () => {
  const cubes = await Cube.find();

  return cubes;
};

const getSearchCube = async (search) => {
  const cubes = await Cube.find({
    name: new RegExp('^' + search + '$', 'i')
  });
  return cubes;
};

const getCube = async (id) => {
  const cube = await Cube.findById(id);
  return cube;
};

const getCubeWithAccessories = async (id) => {
  const cube = await Cube.findById(id).populate('accessories');

  return cube;
};

const updateCube = async (id, accessoryId) => {
  await Cube.findByIdAndUpdate(id, {
    $addToSet: {
      accessories: [accessoryId]
    }
  });
};

const editCube = async (id, cube) => {
  await Cube.findByIdAndUpdate(id, cube);
  console.log(id);
  console.log(cube);
};

const deleteCube = async (id) => {
  await Cube.findByIdAndRemove(id, function (err) {
    if (err) {
      console.log('delete error');
    } else {
      console.log('success');
    }
  });
};

module.exports = {
  saveCube,
  getAllCubes,
  getCube,
  updateCube,
  getCubeWithAccessories,
  getSearchCube,
  editCube,
  deleteCube,
  saveAccessory
};
