"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../../services/user.service");
describe('userReigister', () => {
    it('should register a new user', async () => {
        const user = {
            email: 'test@example.com',
            password: 'Password@12345',
        };
        const result = await (0, user_service_1.userReigister)(user);
        expect(result.email).toBe(user.email);
    });
    it('should throw an error if the user already exists', async () => {
        const user = {
            email: 'test@example.com',
            password: 'password',
        };
        try {
            await (0, user_service_1.userReigister)(user);
        }
        catch (error) {
            expect(error.message).toBe('User already exist');
        }
    });
});
