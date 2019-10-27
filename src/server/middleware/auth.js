const jwt = require('jsonwebtoken');
const Manager = require('../models/manager');

// jwt authentication middleware
const auth = async (req, res, next) => {
  try {
    const header = req.header('Authorization');

    if (!header) {
      throw new Error();
    }

    const token = header.replace('Bearer', '').trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Manager.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: 'An error occurred' });
  }
};

module.exports = auth;
