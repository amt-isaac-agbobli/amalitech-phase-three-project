import { hashData, compareData, generateToken, verifyToken } from '../../utils/helper';

describe('hashData', () => {
    it('should hash a string', async () => {
      const data = 'password';
      const hashedData = await hashData(data);
      expect(hashedData).toEqual(
        expect.any(String)
      );
      expect(hashedData.length).toBeGreaterThan(0);
    });
  });

describe('compareData', () => {
  it('should compare a string to a hashed string', async () => {
    const data = 'password';
    const hashedData = await hashData(data);
    const isMatch = await compareData(data, hashedData);
    expect(isMatch).toBe(true);
  });

  it('should return false if the strings do not match', async () => {
    const data = 'password';
    const hashedData = await hashData(data);
    const isMatch = await compareData('invalid_password', hashedData);
    expect(isMatch).toBe(false);
  });
});

describe('generateToken', () => {
  it('should generate a JWT token', async () => {
    const id = 1;
    const email = 'test@example.com';
    const role = 'admin';
    const token = await generateToken(id, email, role);
    expect(token).toEqual(
      expect.any(String)
    );
    expect(token.length).toBeGreaterThan(0);
  });
});

describe('verifyToken', () => {
  it('should verify a JWT token', async () => {
    const id = 1;
    const email = 'test@example.com';
    const role = 'admin';
    const token = await generateToken(id, email, role);
    const decodedToken : any = await verifyToken(token);
    expect(decodedToken).toBeInstanceOf(Object);
    expect(decodedToken.id).toBe(id);
    expect(decodedToken.email).toBe(email);
    expect(decodedToken.role).toBe(role);
  });

  it('should throw an error if the token is invalid', async () => {
    const token = 'invalid_token';
    await expect(verifyToken(token)).rejects.toThrow('jwt malformed');
  });
});
