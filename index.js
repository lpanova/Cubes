const env = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose');
const config = require('./config/config')[env];
//all configuration app, baset where run project - env - production or development
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
//call instance application on express
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const cubeRouter = require('./routes/cube');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect(
  config.databseUrl,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (err) => {
    if (err) {
      console.log('Error connect', err);
    }
    console.log('Success connect');
  }
);

require('./config/express')(app);
//call steup all aplication and pass them app - instance application

app.use('/', authRouter);
app.use('/', cubeRouter);
app.use('/', indexRouter);

app.listen(
  config.port,
  console.log(`Listening on port ${config.port}! Now its up to you...`)
);
