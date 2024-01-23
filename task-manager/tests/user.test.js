const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'testUser',
  email: 'test@gmail.com',
  password: 'TestPass111',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('should signup a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Hello',
      email: 'hello@gmail.com',
      password: 'HelloPass111',
    })
    .expect(201);
});

test('should login exisiting user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test('should not login nonexisting user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'hahah@gmail.com',
      password: 'akdjf',
    })
    .expect(400);
});

test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get profile for unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('should delete user account for user', async () => {
  await request(app)
    .delete('users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should delete user account for user', async () => {
  await request(app).delete('users/me').send().expect(401);
});
