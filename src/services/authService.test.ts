import { authService } from './authService';

jest.useFakeTimers();

describe('authService', () => {
  it('resolves with user data for correct credentials', async () => {
    const promise = authService.login('test@example.com', 'password');

    // Fast-forward the setTimeout
    jest.advanceTimersByTime(1000);

    await expect(promise).resolves.toEqual({
      id: '1',
      email: 'test@example.com',
    });
  });

  it('rejects with an error for wrong credentials', async () => {
    const promise = authService.login('wrong@example.com', 'wrong');

    jest.advanceTimersByTime(1000);

    await expect(promise).rejects.toThrow('Invalid email or password');
  });

  it('resolves true for logout', async () => {
    await expect(authService.logout()).resolves.toBe(true);
  });
});
