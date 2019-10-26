const { ObjectID } = require('mongodb');
const express = require('express');
const Player = require('../models/player');

const router = new express.Router();

// create new players
router.post('/players', async (req, res) => {
  const player = new Player({ ...req.body });
  try {
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all players
router.get('/players', async (req, res) => {
  try {
    const players = await Player.find({});
    res.send(players);
  } catch (error) {
    res.status(500).send();
  }
});

// get one player
router.get('/players/:id', async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }
  try {
    const player = await Player.findOne({ _id });
    if (!player) {
      return res.status(404).send();
    }
    res.send(player);
  } catch (error) {
    res.status(500).send();
  }
});

// update a player
router.patch('/players/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'position'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates' });
  }
  if (!ObjectID.isValid(_id)) {
    res.status(404).send();
  }
  try {
    const player = await Player.findOne({
      _id: req.params.id,
    });

    if (!player) {
      res.status(404).send();
    }

    updates.forEach((update) => {
      player[update] = req.body[update];
    });
    await player.save();

    res.send(player);
  } catch (error) {
    res.status(400).send();
  }
});

// delete a player
router.delete('/players/:id', async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }
  try {
    const deletePlayer = await Player.findOneAndDelete({ _id });
    if (!deletePlayer) {
      return res.status(404).send();
    }
    res.send(deletePlayer);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
