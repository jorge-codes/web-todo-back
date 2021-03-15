const supertest = require('supertest');
const assert = require('chai').assert;

let createdUser;

describe('controllers/user/update', () => {
  it('should return a 404, not found', (done) => {
    const randomId = 0;
    supertest(sails.hooks.http.app)
      .patch(`/user/${randomId}`)
      .send({ name: 'Random User' })
      .expect(404, done);
  });

  it('should create a new user', (done) => {
    supertest(sails.hooks.http.app)
      .post('/user')
      .send({ name: 'User' })
      .expect(200)
      .then((response) => {
        createdUser = { ...response.body };
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('should return a viable json object', (done) => {
    const newUserName = 'Updated User';
    supertest(sails.hooks.http.app)
      .patch(`/user/${createdUser.id}`)
      .send({ name: newUserName })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const user = response.body;
        assert.equal(user.id, createdUser.id);
        assert.equal(user.name, newUserName);
        assert.equal(user.createdAt, createdUser.createdAt);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
