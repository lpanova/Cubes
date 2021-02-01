const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
  app.engine(
    '.hbs',
    handlebars({
      extname: '.hbs'
    })
  );
  app.use(cookieParser());
  app.set('view engine', '.hbs');
  app.use('/static', express.static('static'));
  app.use(express.json());
};
