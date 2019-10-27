const request = require('supertest');
const app = require('../../server');
const { initializeDb, cleanUpDb } = require('../setup.test');

// initialize the database
initializeDb();

// clean up the database
cleanUpDb();

test('should fail when env not test ', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});

// manager routes test suite
describe('Manager Routes Test', () => {
  let token;
  let _id;
  // create a manager in the database before all tests
  beforeAll(async (done) => {
    await request(app)
      .post('/users')
      .send({
        name: 'manager3',
        email: 'manager3@example.com',
        password: 'manager3Password',
      });
    done();
  });
  // should be able to login with valid manager credentials
  it('should login', async (done) => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'manager3@example.com',
        password: 'manager3Password',
      })
      .then((response) => {
        _id = response.body.user._id;
        token = response.body.token;
        expect(response.statusCode).toBe(200);
      });
    done();
  });
  // should be able to logout as manager
  it('should logout', async (done) => {
    await request(app)
      .post('/users/logout')
      .set('Authorization', `Bearer ${token}`)
      .send({ _id })
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });
  // should not be able to access restricted data without authorization token
  it('should not allow unauthenticated requests', async (done) => {
    await request(app)
      .get(`/users/${_id}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.error).toBeDefined();
      });
    done();
  });
  // should not be able to access manager data while logged out
  it('should not be able to get user details while logged out', async (done) => {
    await request(app)
      .get(`/users/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.error).toBeDefined();
      });
    done();
  });
  // should be able to login again to check manager CRUD functionality
  it('should login', async (done) => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'manager3@example.com',
        password: 'manager3Password',
      })
      .then((response) => {
        _id = response.body.user._id;
        token = response.body.token;
        expect(response.statusCode).toBe(200);
      });
    done();
  });
  // should be able to retrieve manager data
  it('should get manager details', async (done) => {
    await request(app)
      .get(`/users/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });
  // should be able to update manager data
  it('should update manager details', async (done) => {
    await request(app)
      .patch(`/users/${_id}`)
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });
});
