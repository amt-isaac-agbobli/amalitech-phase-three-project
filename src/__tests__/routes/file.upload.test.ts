import request from 'supertest' ;
import app from '../../app/app' ;
import * as dotenv from 'dotenv' ;

dotenv.config() ;

describe('Files Routes', () => {
    it('Upload File', async () => {
        const response = await request(app)
            .post('/api/v1/files/upload')
            .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
            .send({
                title : 'Test File',
                description : 'This is a test file',
                file : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('file');
    });

    it('Upload file if the titel is empty', async() =>{
        const resporn = await request(app)
              .post('/api/v1/files/upload')
              .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
                .send({
                    title : '',
                    description : 'This is a test file',
                    file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                });
        expect(resporn.statusCode).toEqual(400);
        expect(resporn.body).toHaveProperty('errors', [{
            type: 'field',
            value: '',
            msg: 'Invalid value',
            path: 'title',
            location: 'body'
            }]);
    });



    })


