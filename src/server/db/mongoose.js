const mongoose = require('mongoose');
const config = require('../config/config');

// tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

// connect to database
mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('connection to database failed');
  });
