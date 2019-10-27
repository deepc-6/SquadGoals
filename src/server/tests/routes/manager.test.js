const request = require('supertest');
const app = require('../../server');
const { initializeDb, cleanUpDb } = require('../setup.test');

// initialize the database
initializeDb();

// clean up the database
cleanUpDb();

// manager routes test suite
describe('Manager Routes Test', () => {
  let token;
  let _id;

  // create a manager in the database
  it('should create new manager', async (done) => {
    await request(app)
      .post('/manager')
      .send({
        name: 'manager3',
        email: 'manager3@example.com',
        password: 'manager3Password',
      })
      .then((response) => expect(response.statusCode).toBe(201));
    done();
  });

  // should be able to login with valid manager credentials
  it('should login', async (done) => {
    await request(app)
      .post('/manager/login')
      .send({
        email: 'manager3@example.com',
        password: 'manager3Password',
      })
      .then((response) => {
        _id = response.body._id;
        token = response.body.token;
        expect(response.statusCode).toBe(200);
      });
    done();
  });

  // should be able to logout as manager
  it('should logout', async (done) => {
    await request(app)
      .get('/manager/logout')
      .set('Authorization', `Bearer ${token}`)
      .send({ _id })
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should not be able to access restricted data without authorization token
  it('should not allow unauthenticated requests', async (done) => {
    await request(app)
      .get(`/manager/${_id}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.error).toBeDefined();
      });
    done();
  });

  // should not be able to access manager data while logged out
  it('should not be able to get user details while logged out', async (done) => {
    await request(app)
      .get(`/manager/${_id}`)
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
      .post('/manager/login')
      .send({
        email: 'manager3@example.com',
        password: 'manager3Password',
      })
      .then((response) => {
        _id = response.body._id;
        token = response.body.token;
        expect(response.statusCode).toBe(200);
      });
    done();
  });

  // should be able to retrieve manager data
  it('should get manager details', async (done) => {
    await request(app)
      .get(`/manager/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to update manager data
  it('should update manager details', async (done) => {
    await request(app)
      .patch(`/manager/${_id}`)
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
      .delete(`/manager/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });
});
