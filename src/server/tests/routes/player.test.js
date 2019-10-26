const request = require('supertest');
const app = require('../../server');
const { cleanUpDb } = require('../setup.test');

// clean up the database
cleanUpDb();

// player routes test suite
describe('Player Routes Test', () => {
  let playerId;

  // create a new player
  it('should create new players', async (done) => {
    await request(app)
      .post('/players')
      .send({
        name: 'player3',
        age: 21,
        position: 'LB',
      })
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
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to access specific player data based on id sent
  it('should get player details', async (done) => {
    await request(app)
      .get(`/players/${playerId}`)
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });

  // should be able to update specific player data
  it('should update player details', async (done) => {
    await request(app)
      .patch(`/players/${playerId}`)
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
      .then((response) => expect(response.statusCode).toBe(200));
    done();
  });
});
