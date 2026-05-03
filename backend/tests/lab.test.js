import request from 'supertest';
import app from '../server.js';

describe('Labs', () => {
  describe('POST /api/labs/start', () => {
    it('should start a new lab session', async () => {
      const token = 'valid_jwt_token';

      const res = await request(app)
        .post('/api/labs/start')
        .set('Authorization', `Bearer ${token}`)
        .send({
          taskId: 'task1',
        });

      expect([200, 202]).toContain(res.statusCode);
      expect(res.body).toHaveProperty('data.sessionId');
    });
  });
});
