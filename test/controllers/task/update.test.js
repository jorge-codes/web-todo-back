const supertest = require('supertest');
const assert = require('chai').assert;

let createdUser = {};
let createdTask = {};

describe('controllers/task/update', () => {
  it('should return a 404, not found', (done) => {
    const id = 0;
    supertest(sails.hooks.http.app)
      .patch(`/task/${id}`)
      .send({ description: 'Random task' })
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

  it('should create a new task', (done) => {
    const user = createdUser.id;
    const description = 'Task description';
    supertest(sails.hooks.http.app)
      .post('/task')
      .send({ user, description })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        createdTask = { ...response.body };
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('should return a valid JSON object', (done) => {
    const id = createdTask.id;
    const state = 1; //done
    supertest(sails.hooks.http.app)
      .patch(`/task/${id}`)
      .send({ state })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const task = response.body;
        assert.equal(task.id, createdTask.id);
        assert.equal(task.user, createdTask.user);
        assert.equal(task.description, createdTask.description);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('should return a valid JSON object', (done) => {
    const id = createdTask.id;
    const description = 'Updated task';
    supertest(sails.hooks.http.app)
      .patch(`/task/${id}`)
      .send({ description })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const task = response.body;
        assert.equal(task.id, createdTask.id);
        assert.equal(task.user, createdTask.user);
        assert.equal(task.description, description);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
