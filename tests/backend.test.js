const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const User = require('../models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  process.env.JWT_SECRET = 'test_secret';
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail to register duplicate user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.msg).toEqual('User exists');
  });
});