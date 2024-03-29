const { ObjectID } = require('mongodb');
const express = require('express');
const Player = require('../models/player');
const authenticate = require('../middleware/auth');

const router = new express.Router();

// create new players
router.post('/players', authenticate, async (req, res) => {
  const player = new Player({ ...req.body });
  try {
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all players
router.get('/players/:managerId', authenticate, async (req, res) => {
  const { managerId } = req.params;
  try {
    const players = await Player.find({ managerId });
    res.send(players);
  } catch (error) {
    res.status(500).send();
  }
});

// get one player
router.get('/players/:managerId/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  const { managerId } = req.params;
  if (!ObjectID.isValid(_id) || !ObjectID.isValid(managerId)) {
    return res.status(404).send();
  }
  try {
    const player = await Player.findOne({ _id, managerId });
    if (!player) {
      return res.status(404).send();
    }
    res.send(player);
  } catch (error) {
    res.status(500).send();
  }
});

// update a player
router.patch('/players/:managerId/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  const { managerId } = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'position'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates' });
  }
  if (!ObjectID.isValid(_id) || !ObjectID.isValid(managerId)) {
    res.status(404).send();
  }
  try {
    const player = await Player.findOne({ _id, managerId });

    if (!player) {
      res.status(404).send();
    }

    updates.forEach((update) => {
      if (req.body[update]) {
        player[update] = req.body[update];
      }
    });
    await player.save();
    res.send(player);
  } catch (error) {
    res.status(400).send();
  }
});

// delete a player
router.delete('/players/:managerId/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  const { managerId } = req.params;
  if (!ObjectID.isValid(_id) || !ObjectID.isValid(managerId)) {
    return res.status(404).send();
  }
  try {
    const deletePlayer = await Player.findOneAndDelete({ _id, managerId });
    if (!deletePlayer) {
      return res.status(404).send();
    }
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
