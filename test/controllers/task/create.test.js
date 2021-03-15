const supertest = require('supertest');
const assert = require('chai').assert;

let createdUser;

describe('controllers/task/create', () => {
  it('should return a 404 error', (done) => {
    supertest(sails.hooks.http.app)
      .post('/task')
      .send({ description: 'Description' }) //not defined user id
      .expect(400, done);
  });

  it('should return 404', (done) => {
    const user = 0;
    const description = 'Task description';
    supertest(sails.hooks.http.app)
      .post(`/task`)
      .send({ user, description })
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

  it('should return a viable JSON object', (done) => {
    const user = createdUser.id;
    const description = 'Task description';
    supertest(sails.hooks.http.app)
      .post('/task')
      .send({ user, description })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const task = response.body;
        assert.equal(task.description, description);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
