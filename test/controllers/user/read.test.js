const expect = require('chai').expect;
const supertest = require('supertest');

describe('controllers/user/', () => {
  it('should return an array of JSON objects with users', (done) => {
    supertest(sails.hooks.http.app)
      .get('/user')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('array');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
