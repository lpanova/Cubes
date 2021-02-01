const fs = require('fs');

const getCubes = (callback) => {
  fs.readFile('./config/database.json', (error, dbdata) => {
    if (error) {
      throw error;
    } else {
      const cubes = JSON.parse(dbdata);
      console.log(cubes);
      callback(cubes);
    }
  });
};

const saveCube = (cube, callback) => {
  getCubes((cubes) => {
    cubes.push(cube);

    fs.writeFile('./config/database.json', JSON.stringify(cubes), (error) => {
      if (error) {
        throw error;
      } else {
        console.log('Super new cube');
        callback();
      }
    });
  });
};

const getCube = (id, callback) => {
  getCubes((cubes) => {
    const cube = cubes.filter((c) => c.id === id)[0];
    callback(cube);
  });
};

module.exports = {
  saveCube,
  getCube,
  getCubes
};
