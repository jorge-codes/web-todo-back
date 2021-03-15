const supertest = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;

let createdUser = {};
let createdTasks = [];

describe('controllers/task/user', () => {
  it('should return a 404', (done) => {
    const randomId = 0;
    supertest(sails.hooks.http.app)
      .get(`/task/user/${randomId}`)
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

  it('should create new task #1', (done) => {
    const user = createdUser.id;
    const description = 'Task #1';
    supertest(sails.hooks.http.app)
      .post('/task')
      .send({ user, description })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const task = response.body;
        createdTasks = [...createdTasks, task];
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('should create new task #2', (done) => {
    const user = createdUser.id;
    const description = 'Task #2';
    supertest(sails.hooks.http.app)
      .post('/task')
      .send({ user, description })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const task = response.body;
        createdTasks = [...createdTasks, task];
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('should return an array of tasks', (done) => {
    const user = createdUser.id;
    supertest(sails.hooks.http.app)
      .get(`/task/user/${user}`)
      .expect(200)
      .expect('Content-type', /json/)
      .then((response) => {
        const tasks = response.body;
        assert.isObject(tasks, 'tasks is an object with two attributes');
        assert.isObject(tasks.user, 'the user object');
        assert.isString(tasks.user.name, 'the name of the user');
        expect(tasks.tasks).to.be.an('array');
        assert.equal(createdTasks.length, tasks.tasks.length);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
