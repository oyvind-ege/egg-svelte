/* eslint-disable no-unused-vars */
const supertest = require('supertest');
const app = require('../server');

const request = supertest(app);

describe('the API', () => {
  test('root returns message', async (done) => {
    const res = await request.get('/api');
    expect(res.status).toBe(404);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.status).toBe('fail');
    done();
  });
  test('/regions returns full array', async (done) => {
    const res = await request.get('/api/regions');
    expect(res.status).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.status).toBe('success');
    expect(res.body.data.length).toBe(1);
    done();
  });
});
