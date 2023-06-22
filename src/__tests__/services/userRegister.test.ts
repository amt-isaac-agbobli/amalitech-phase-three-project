import { userReigister } from '../../services/user.service';

describe('userReigister', () => {
  it('should register a new user', async () => {
    const user = {
      email: 'test@example.com',
      password: 'Password@12345',
    };
    const result = await userReigister(user);
    expect(result.email).toBe(user.email);
  });

  it('should throw an error if the user already exists', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password',
    };
    try {
      await userReigister(user);
    } catch (error:any) {
      expect(error.message).toBe('User already exist');
    }
  });
});
