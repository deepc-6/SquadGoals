const mongoose = require('mongoose');

// player model
const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    managerId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
