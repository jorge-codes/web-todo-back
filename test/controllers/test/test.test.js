const supertest = require('supertest');

describe('controllers/test/test', () => {
  it('GET /', (done) => {
    const expected = { message: 'It works!' };
    supertest(sails.hooks.http.app).get('/').expect(expected).expect(200, done);
  });
  it('GET /test', (done) => {
    const expected = { message: 'It works!' };
    supertest(sails.hooks.http.app)
      .get('/test')
      .expect('Content-Type', /json/)
      .expect(expected)
      .expect(200, done);
  });
});
