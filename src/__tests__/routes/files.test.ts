import request from 'supertest';
import app from '../../app/app';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpc2FhYy5hZ2JvYmxpQGFtYWxpdGVjaC5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODc2MDc3NjYsImV4cCI6MTY4NzY5NDE2Nn0.x369y2W2MU1lAC5E3oRLQ0oAdKSY_fSeM6b4kFvW4b0"


describe('Files Routes', () => {
    it('Get All Files', async () => {
        const response = await request(app)
            .get('/api/v1/files')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "Download Url": expect.any(String),
                    "description": expect.any(String),
                    "id": expect.any(Number),
                    "title": expect.any(String)
                })
            ])
        );
    });

    it('Get File by ID', async () => {
         const response = await request(app)
             .get('/api/v1/files/2')
             .set('Authorization', `Bearer ${token}`);
         expect(response.statusCode).toEqual(200);
         expect(response.body).toHaveProperty('file');
         
    });
 
     it('Get File by ID with wrong ID', async () => {
         const response = await request(app)
             .get('/api/v1/files/100')
             .set('Authorization', `Bearer ${token}`);
         expect(response.statusCode).toEqual(500);
         expect(response.body.message).toEqual('File Does Not Exist');
     });
 
     it('Download File by ID', async () => {
         const response = await request(app)
             .get('/api/v1/files/download/2')
             .set('Authorization', `Bearer ${token}`);
         expect(response.statusCode).toEqual(200);
         expect(response.body).toHaveProperty('file');
     });
 
     it('Download File by ID with wrong ID', async () => {
         const response = await request(app)
             .get('/api/v1/files/download/100')
             .set('Authorization', `Bearer ${token}`);
         expect(response.statusCode).toEqual(500);
         expect(response.body.message).toEqual('File Does Not Exist');
     });  
}
);