"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app/app"));
describe('Admin Routes', () => {
    it('Admin Login', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/admins/sign-in')
            .send({
            email: 'isaac.agbobli@amalitech.org',
            password: 'Ayuba@1234'
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('Token');
    });
    it('Admin Login with wrong password', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/admins/sign-in')
            .send({
            email: 'isaac.agbobli@amalitech.org',
            password: 'Ayuba@'
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.message).toEqual('Invalid Credentials');
    });
    it('Admin Login with wrong email', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/admins/sign-in')
            .send({
            email: 'admin@gmail.com',
            password: 'Ayuba@1234'
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.message).toEqual('Admin Does Not Exist');
    });
    it('Admin Longin with empty email', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/admins/sign-in')
            .send({
            email: '',
            password: 'Ayuba@1234'
        });
        console.log(response.body);
        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty("errors", [{
                type: 'field',
                value: '',
                msg: 'Invalid value',
                path: 'email',
                location: 'body'
            }]);
    });
    it('Admin Longin with empty password', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/admins/sign-in')
            .send({
            email: 'isaac.agbobli@amalitech.org',
            password: ''
        });
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Password is required');
    });
});
