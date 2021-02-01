const { findById } = require('../models/cube');
const Cube = require('../models/cube');
const Search = require('../models/search');

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
  getAllCubes,
  getCube,
  updateCube,
  getCubeWithAccessories,
  getSearchCube,
  editCube,
  deleteCube
};
