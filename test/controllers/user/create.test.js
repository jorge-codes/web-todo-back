const supertest = require('supertest');
const assert = require('chai').assert;

describe('controllers/user/create', () => {
  it('should return a viable json object', (done) => {
    supertest(sails.hooks.http.app)
      .post('/user')
      .send({ name: 'Name' })
      .expect(200)
      .then((response) => {
        const user = response.body;
        assert.isObject(user, 'user created is an object');
        assert.isNumber(user.id, 'user id');
        assert.equal(user.name, 'Name');
        assert.isNumber(user.createdAt, 'created date in unix epoch');
        assert.isNumber(user.updatedAt, 'created date in unix epoch');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
