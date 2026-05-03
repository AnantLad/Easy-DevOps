import request from 'supertest';
import app from '../server.js';

describe('Validation', () => {
  describe('POST /api/validation/:taskId', () => {
    it('should validate a task', async () => {
      const token = 'valid_jwt_token';

      const res = await request(app)
        .post('/api/validation/task1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          sessionId: 'session_id',
        });

      expect([200, 201]).toContain(res.statusCode);
      expect(res.body).toHaveProperty('data.success');
    });
  });
});
