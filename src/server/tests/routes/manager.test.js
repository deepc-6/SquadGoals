const request = require('supertest');
const app = require('../../server');
const { cleanUpDb } = require('../setup.test');

// clean up the database
cleanUpDb();

// manager routes test suite
describe('Manager Routes Test', () => {
  let _id;

  // should be able to create a new manager
  it('should create new manager', async (done) => {
    await request(app)
      .post('/users')
      .send({
        name: 'manager3',
        email: 'manager3@example.com',
        password: 'manager3Password',
      })
      .then((response) => {
        _id = response.body._id;
        expect(response.statusCode).toBe(201);
      });
    done();
  });

  // should be able to view manager data
  it('should get manager details', async (done) => {
    await request(app)
      .get(`/users/${_id}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to update manager data
  it('should update manager details', async (done) => {
    await request(app)
      .patch(`/users/${_id}`)
      .send({
        name: 'manager4',
        email: 'manager4@example.com',
        password: 'manager4Password',
      })
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to delete manager data
  it('should delete manager', async (done) => {
    await request(app)
      .delete(`/users/${_id}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });
});
