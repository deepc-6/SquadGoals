const request = require('supertest');
const app = require('../../server');
const { initializeDb, cleanUpDb } = require('../setup.test');

// initialize the database
initializeDb();

// clean up the database
cleanUpDb();

// player routes test suite
describe('Player Routes Test', () => {
  let token;
  let _id;
  let playerId;

  // create a manager in the database before all tests
  beforeAll(async (done) => {
    await request(app)
      .post('/users')
      .send({
        name: 'manager5',
        email: 'manager5@example.com',
        password: 'manager5Password',
      });
    done();
  });

  // login with valid manager credentials
  it('should login', async (done) => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'manager5@example.com',
        password: 'manager5Password',
      })
      .then((response) => {
        _id = response.body.user._id;
        token = response.body.token;
        expect(response.statusCode).toBe(200);
      });
    done();
  });

  // logout as manager
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
      .get('/players')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.error).toBeDefined();
      });
    done();
  });

  // should not be able to access player data while logged out
  it('should not be able to get players while logged out', async (done) => {
    await request(app)
      .get('/players')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.error).toBeDefined();
      });
    done();
  });

  // login again to check player CRUD functionality
  it('should login', async (done) => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'manager5@example.com',
        password: 'manager5Password',
      })
      .then((response) => {
        _id = response.body.user._id;
        token = response.body.token;
        expect(response.statusCode).toBe(200);
      });
    done();
  });

  // create a new player
  it('should create new players', async (done) => {
    await request(app)
      .post('/players')
      .send({
        name: 'player3',
        age: 21,
        position: 'LB',
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        playerId = response.body._id;
        expect(response.statusCode).toBe(201);
      });
    done();
  });

  // should be able to view all players
  it('should get all players', async (done) => {
    await request(app)
      .get('/players')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to access specific player data based on id sent
  it('should get player details', async (done) => {
    await request(app)
      .get(`/players/${playerId}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to update specific player data
  it('should update player details', async (done) => {
    await request(app)
      .patch(`/players/${playerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: 22,
      })
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to delete specific player data
  it('should delete player', async (done) => {
    await request(app)
      .delete(`/players/${playerId}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });
});
