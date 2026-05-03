import request from 'supertest';
import app from '../server.js';

describe('Authentication', () => {
  describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('data.accessToken');
    });

    it('should not create duplicate user', async () => {
      await request(app).post('/api/auth/signup').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app).post('/api/auth/signup').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user with correct credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data.accessToken');
    });
  });
});
