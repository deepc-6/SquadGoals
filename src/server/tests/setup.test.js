const mongoose = require('mongoose');
const config = require('../config/config');

// tell mongoose to use es6 implementation of promises
mongoose.promise = global.Promise;

// check if node environment is set to test
test('should fail when env not test ', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});

// removes all collections from the database
async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

// drops all collections from the database
async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === 'ns not found') return;
      if (
        error.message.includes('a background operation is currently running')
      ) {
        return;
      }
      console.log(error.message);
    }
  }
}

module.exports = {
  // initializes the test database
  initializeDb() {
    mongoose.connect(config.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  },

  // cleans up the test database
  cleanUpDb() {
    afterAll(async () => {
      await removeAllCollections();
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
};
