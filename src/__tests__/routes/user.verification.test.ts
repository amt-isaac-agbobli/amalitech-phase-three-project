import request from 'supertest';
import app from '../../app/app';

describe('User Account Verification Test', () => {
    it('User Resqust OTP test' , async () => {
        const response = await request(app)
              .post('/api/v1/users/request-otp')
              .send({
                email:'agboblisaackwadzo@gmail.com'
              });
        console.log(response.statusCode)
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Otp sent successfully')
    },  100000);

    it('User Verify OTP test' , async () => {
        const response = await request(app)
              .post('/api/v1/users/verify')
              .send({
                email:'agboblisaackwadzo@gmail.com',
                otp: '1234'
              });
        console.log(response.statusCode)  
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Email verified successfully')
    },  100000);

    it('User Forget Password OTP test' , async () => {    
          const response = await request(app)
                .post('/api/v1/users/forget-password')
                .send({
                  email:'agboblisaackwadzo@gmail.com'
                });
          console.log(response.statusCode)
          expect(response.statusCode).toEqual(200);
          expect(response.body.message).toEqual('Otp sent successfully')
      },  100000);

      it('User Reset Password OTP test' , async () => {     
          const response = await request(app)
                .post('/api/v1/users/reset-password')
                .send({
                  email:'agboblisaackwadzo@gmail.com',
                  otp : '1234',
                  password: 'Ayuba@123' });
          console.log(response.statusCode)
          expect(response.statusCode).toEqual(200);
          expect(response.body.message).toEqual('Password reset successfully')
      },  100000);

      it('OTP is invalid' , async () => {         
            const response = await request(app)
                  .post('/api/v1/users/verify')
                  .send({
                    email:'agboblisaackwadzo@gmail.com',
                    otp: '1234'
                  });
            console.log(response.statusCode)
            expect(response.statusCode).toEqual(500);
            expect(response.body.message).toEqual('Invalid OTP')
        },  100000);   
});