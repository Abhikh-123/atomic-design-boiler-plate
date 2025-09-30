import { validateEmail, validatePassword } from '../../utils/validators';

describe('validateEmail', () => {
  it('returns true for a valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('hello.world@domain.co')).toBe(true);
  });

  it('returns false for an invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('missing@domain')).toBe(false);
    expect(validateEmail('missing.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('validatePassword', () => {
  it('returns true for a password with 6 or more characters', () => {
    expect(validatePassword('123456')).toBe(true);
    expect(validatePassword('longpassword')).toBe(true);
  });

  it('returns false for an empty password', () => {
    expect(validatePassword('')).toBe(false);
  });

  it('catches bug in current implementation (sort not empty passwords pass)', () => {
    expect(validatePassword('abc')).toBe(false);
  });
});
