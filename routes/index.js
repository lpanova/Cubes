// TODO: Require Controllers...
const { Router, request } = require('express');
const {
  saveCube,
  getAllCubes,
  getCube,
  updateCube,
  getCubeWithAccessories,
  getSearchCube,
  editCube,
  deleteCube,
  saveAccessory
} = require('../controllers/cubes');
const {
  checkoutAuthentication,
  checkoutAuthenticationJSON,
  getUserStatus
} = require('../controllers/user');
const router = Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const { getAccessories } = require('../controllers/accessories');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');

const privatekey = 'Cube';

router.get('/', getUserStatus, async (req, res) => {
  const cubes = await getAllCubes();

  res.render('index', {
    title: 'Home Cube',
    cubes: cubes,
    isLoggedIn: req.isLoggedIn
  });
});

router.get('/about', getUserStatus, (req, res) => {
  res.render('about', {
    isLoggedIn: req.isLoggedIn
  });
});

router.get('/create', checkoutAuthentication, getUserStatus, (req, res) => {
  res.render('create', {
    isLoggedIn: req.isLoggedIn
  });
});

getUserStatus,
  router.post(
    '/create',
    checkoutAuthenticationJSON,
    getUserStatus,
    async (req, res) => {
      const error = await saveCube(req, res);

      if (error) {
        return res.render('create', {
          error:
            'Name sсhould be at least 5 characters long , description schould be between 20 and 2000 charachters long and imageURl is required',
          isLoggedIn: req.isLoggedIn
        });
      } else {
        res.redirect('/');
        return;
      }

      // const { name, description, imageUrl, difficultyLevel } = req.body;

      // const token = req.cookies['aid'];
      // const decodetObject = jwt.verify(token, privatekey);
      // const cube = new Cube({
      //   name,
      //   description,
      //   imageUrl,
      //   difficulty: difficultyLevel,
      //   creatorId: decodetObject.userID
      // });

      // cube.save((err) => {
      //   if (err) {
      //     console.log(err);
      //     res.status(400);
      //     res.send(err);
      //   } else {
      //     res.redirect('/');
      //   }
      // });
    }
  );

router.get('/details/:id', getUserStatus, async (req, res) => {
  const cube = await getCubeWithAccessories(req.params.id);

  res.render('details', {
    cube: cube,
    isLoggedIn: req.isLoggedIn
  });
});

router.get('/edit/:id', getUserStatus, async (req, res) => {
  const cube = await getCube(req.params.id);
  res.render('edit', {
    cube: cube,
    isLoggedIn: req.isLoggedIn
  });
});

router.post('/edit/:id', async (req, res) => {
  const cube = req.body;
  await editCube(req.params.id, cube);
  console.log(cube);
  res.redirect('/');
});

router.get('/delete/:id', getUserStatus, async (req, res) => {
  const cube = await getCube(req.params.id);
  res.render('delete', {
    cube: cube,
    isLoggedIn: req.isLoggedIn
  });
});
router.post('/delete/:id', async (req, res) => {
  await deleteCube(req.params.id);
  res.redirect('/');
});

router.get(
  '/create/accessory',
  checkoutAuthentication,
  getUserStatus,
  async (req, res) => {
    res.render('createAccessory', {
      isLoggedIn: req.isLoggedIn
    });
  }
);

router.post(
  '/create/accessory',
  checkoutAuthenticationJSON,
  async (req, res) => {
    const error = await saveAccessory(req, res);
    if (error) {
      res.render('createAccessory', {
        error:
          'Name sсhould be at least 5 characters long , description schould be between 20 and 2000 charachters long and imageURl is required',
        isLoggedIn: req.isLoggedIn
      });
    } else {
      res.redirect('/create/accessory');
    }

    // const { name, description, imageUrl } = req.body;
    // const accessory = new Accessory({
    //   name,
    //   description,
    //   imageUrl
    // });
    // await accessory.save();
    // res.redirect('/create/accessory');
  }
);

router.get(
  '/attach/accessory/:id',
  checkoutAuthentication,
  getUserStatus,
  async (req, res) => {
    const cube = await getCube(req.params.id);
    const accessories = await getAccessories();

    const notAttachedAccessories = accessories.filter(
      (acc) => !cube.accessories.includes(acc._id)
    );

    res.render('attachAccessory', {
      cube: cube,
      accessories: notAttachedAccessories,
      isAllAttached: cube.accessories.length === accessories.length,
      isLoggedIn: req.isLoggedIn
    });
  }
);

router.post('/attach/accessory/:id', async (req, res) => {
  const { accessory } = req.body;
  await updateCube(req.params.id, accessory);
  // id = req.params.id;
  // res.redirect(`details/${id}`);
  res.redirect('/');
});

router.post('/search', getUserStatus, async (req, res) => {
  const { search } = req.body;
  const cubes = await getSearchCube(search);

  if (cubes.length === 0) {
    res.render('search', {
      error: 'There are not suche cubes',
      isLoggedIn: req.isLoggedIn
    });
  } else {
    res.render('search', {
      cubes: cubes,
      isLoggedIn: req.isLoggedIn
    });
  }
});

router.get('/logout', function (req, res) {
  res.clearCookie('aid');
  res.redirect('/');
});

router.get('*', (req, res) => {
  res.render('404');
});
module.exports = router;
