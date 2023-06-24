import app from '../../app/app';
import request from 'supertest';

/*describe('App', () => {
    it('should start the server', async () => {
        const server = app.listen(5000);
        await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
        });
        expect(server.listening).toBe(true);
    });
    }
); */


describe('POST /sign-up', () => {
    it('should register a new user', async () => {
        const response = await request(app).post('/api/v1/users/sign-up').send({
            email: 'ayuba1@gmail.com',
            password: 'Ayuba@123' });
        expect(response.statusCode).toEqual(201);
        expect(response.body.message).toEqual('User account was created successful check your email to verify your account'); });

    it('should throw an error if the email is empty', async () => {
        const response = await request(app).post('/api/v1/users/sign-up ').send({
            email: '',
            password: 'Ayuba@123' });
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Email is required'); });

    it('should throw an error if the password is empty', async () => {
        const response = await request(app).post('/api/v1/users/sign-up ').send({
            email: 'example@gmail.com',
            password: '' });
            expect(response.statusCode).toEqual(400);
            expect(response.body.message).toEqual('Password is required'); });

    it('should throw an error if the email is already in use', async () => {
        const response = await request(app).post('/api/v1/users/sign-up ').send({
            email: 'example@gmail.come',
            password: 'Ayuba@123' });
        expect(response.statusCode).toEqual(500);
        expect(response.body.message).toEqual('User already exist'); });
    }
);

describe('POST /login', () => {
    it('should login a user', async () => {
        const response = await request(app).post('/api/v1/users/sign-in').send({
            email: 'example@gmail.come',
            password : 'Ayuba@123' });
            console.log(response)
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('Token'); 
    });

    it('should throw an error if the email is empty', async () => {
      const response = await request(app).post('/api/v1/users/sign-in').send({
        email: '',
        password: 'Ayuba@123' });
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Email is required'); });

    it('should throw an error if the password is empty', async () => {
        const response = await request(app).post('/api/v1/users/sign-in').send({
            email: 'example@gmail.come',
            password: '' });
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Password is required'); });
    
    it('should throw an error if the email is not found', async () => {
        const response = await request(app).post('/api/v1/users/sign-in').send({
            email: '"example@gmail.com',
            password: 'Ayuba@123' });
        expect(response.statusCode).toEqual(500);
        expect(response.body.message).toEqual('User not found'); });

    it('should throw an error if the password is incorrect', async () => {
        const response = await request(app).post('/api/v1/users/sign-in').send({
            email: 'example@gmail.come',
            password: 'Ayuba@12' });
        expect(response.statusCode).toEqual(500);
        expect(response.body.message).toEqual('Invalid credentials'); });

    it('should throw an error if the email is not verified', async () => {
        const response = await request(app).post('/api/v1/users/sign-in').send({
            email: 'kiska0809@aelup.com',
            password: 'Ayuba@123' });
        expect(response.status).toBe(500);
        expect(response.body.message).toEqual('Please your account is not verified'); });

}
);


//command to run single file test: npm test -- src\__tests__\routes\user.test.ts

