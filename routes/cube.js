const express = require('express');
const router = express.Router();
const { checkoutAuthentication } = require('../controllers/user');

router.get('/edit', checkoutAuthentication, (req, res) => {
  res.render('edit');
});

router.get('/delete', checkoutAuthentication, (req, res) => {
  res.render('delete');
});

module.exports = router;
