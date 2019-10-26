const mongoose = require('mongoose');

const Manager = require('../../models/manager');
const { cleanUpDb, initializeDb } = require('../setup.test');

// tell mongoose to use es6 implementation of promises
mongoose.promise = global.Promise;

// initialize the database
initializeDb();

// clean up the database
cleanUpDb();

// manager model test suite
describe('Manager Model Test', () => {
  // should be able to save a valid user in the database
  it('should create and save user successfully', async () => {
    const userData = {
      name: 'manager1',
      email: 'manager1@example.com',
      password: 'manager1Password',
    };
    const validUser = new Manager(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBeDefined();
  });

  // should not be able to add in any field that isn't defined in the schema
  it('should insert user successfully, but the field not defined in schema should be undefined', async () => {
    const userWithInvalidField = new Manager({
      name: 'manager2',
      email: 'manager2@example.com',
      password: 'manager2Password',
      age: 40,
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.age).toBeUndefined();
  });

  // should not be able to add an user without all the required fields defined in the schema
  it('should not be able to create user without required fields', async () => {
    const userWithoutRequiredField = new Manager({ name: 'manager3' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});
