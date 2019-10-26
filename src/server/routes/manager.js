const { ObjectID } = require('mongodb');
const express = require('express');
const Manager = require('../models/manager');

const router = new express.Router();

// create a new manager
router.post('/users', async (req, res) => {
  const user = new Manager({ ...req.body });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// view manager details
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }
  try {
    const user = await Manager.findOne({ _id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// update manager details
router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid request' });
  }

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    const user = await Manager.findOne({
      _id: req.params.id,
    });

    if (!user) {
      res.status(404).send();
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

// delete manager account
router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    const deleteUser = await Manager.findOneAndDelete({ _id });
    if (!deleteUser) {
      return res.status(404).send();
    }
    await deleteUser.remove();
    res.send(deleteUser);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
