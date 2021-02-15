const express = require('express');
const router = express.Router();
const {
  saveUser,
  verifyUser,
  checkGuestAccess,
  getUserStatus
} = require('../controllers/user.js');

router.get('/login', checkGuestAccess, getUserStatus, (req, res) => {
  const error = req.query.error ? 'Username or password is not correct!' : null;
  console.log(req.query.message);
  res.render('login', {
    isLoggedIn: req.isLoggedIn,
    error: error
  });
});

router.post('/login', async (req, res) => {
  const { error } = await verifyUser(req, res);

  if (error) {
    res.redirect('/login?error=true');
  } else res.redirect('/');
});

router.get('/register', checkGuestAccess, getUserStatus, (req, res) => {
  const error = req.query.error ? 'Username or password is not valid!' : null;

  res.render('register', {
    isLoggedIn: req.isLoggedIn,
    error: error
  });
});

router.post('/register', async (req, res) => {
  const { password } = req.body;
  console.log(!password);

  if (!password || password.length < 8 || !password.match(/^[A-Za-z0-9]+$/)) {
    res.redirect('/register?error=true&ala=1');
    return;
    // return res.render('register', {
    //   isLoggedIn: req.isLoggedIn,
    //   error: 'Username or password is not valid!'
    // });
  }

  const { error } = await saveUser(req, res);
  console.log('Error', error);
  if (error) {
    // return res.render('register', {
    //   isLoggedIn: req.isLoggedIn,
    //   error
    // });
    res.redirect('/register?error=true&bala=121');
    return;
  } else {
    res.redirect('/');
    return;
  }
});

module.exports = router;
