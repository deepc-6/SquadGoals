const express = require('express');
const cors = require('cors');

require('./db/mongoose');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`server is up on ${port}`);
});
