const mongoose = require('mongoose');

const Player = require('../../models/player');
const { cleanUpDb, initializeDb } = require('../setup.test');

// tell mongoose to use es6 implementation of promises
mongoose.promise = global.Promise;

// initialize the database
initializeDb();

// clean up the database
cleanUpDb();

// player model test suite
describe('Player Model Test', () => {
  // should be able to save a valid player in the database
  it('should create and save player successfully', async () => {
    const userData = {
      name: 'player1',
      age: 20,
      position: 'LB',
    };
    const validUser = new Player(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.age).toBe(userData.age);
    expect(savedUser.position).toBe(userData.position);
  });

  // should not be able to add in any field that isn't defined in the schema
  it('should insert player successfully, but the field not defined in schema should not be inserted', async (done) => {
    const userWithInvalidField = new Player({
      name: 'player2',
      age: 20,
      position: 'LB',
      gender: 'M',
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.gender).toBeUndefined();
    done();
  });

  // should not be able to add a player without all the required fields defined in the schema
  it('should not be able to create player without required fields', async () => {
    const userWithoutRequiredField = new Player({ name: 'player3' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
