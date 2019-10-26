const express = require('express');
const cors = require('cors');

require('./db/mongoose');

const managerRoutes = require('./routes/manager');
const playerRoutes = require('./routes/player');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(managerRoutes);
app.use(playerRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`server is up on ${port}`);
  });
}

module.exports = app;
