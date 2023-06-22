import request from "supertest";

import app from '../../app/app';

describe('App', () => {
    it('should start the server', async () => {
      const server = app.listen(3000);
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      expect(server.listening).toBe(true);
    });
  });
