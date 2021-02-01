const express = require('express');
const router = express.Router();
const {
  saveUser,
  verifyUser,
  checkGuestAccess,
  getUserStatus
} = require('../controllers/user.js');

router.get('/login', checkGuestAccess, getUserStatus, (req, res) => {
  res.render('login', {
    isLoggedIn: req.isLoggedIn
  });
});

router.post('/login', async (req, res) => {
  const status = await verifyUser(req, res);

  if (status) {
    res.redirect('/');
  } else console.log('Errorr status hash');
});

router.get('/register', checkGuestAccess, getUserStatus, (req, res) => {
  res.render('register', {
    isLoggedIn: req.isLoggedIn
  });
});

router.post('/register', async (req, res) => {
  const status = await saveUser(req, res);

  if (status) {
    res.redirect('/');
  } else console.log('Errorr status hash');
});

module.exports = router;
