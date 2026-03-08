const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Problems API', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should get a list of problems', async () => {
    const res = await request(app).get('/api/problems');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
