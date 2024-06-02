import { Password } from '../../../../../core/17-backend-testing/core/valueObjects/password';

describe('The Password', () => {
  it('creates a password when the given value meets the requeriments for a strong password', () => {
    expect(Password.createFromPlainText('SecurePass123_')).toBeInstanceOf(
      Password,
    );
  });

  it('fails when the password is too short', () => {
    expect(() => {
      Password.createFromPlainText('1aA_');
    }).toThrow('Password is too short');
  });

  it('fails when the password is missing a number', () => {
    expect(() => {
      Password.createFromPlainText('aaaaA_');
    }).toThrow('Password must contain a number');
  });

  it('fails when the password is missing a lowercase letter', () => {
    expect(() => {
      Password.createFromPlainText('1234A_');
    }).toThrow('Password must contain a lowercase letter');
  });

  it('fails when the password is missing a uppercase letter', () => {
    expect(() => {
      Password.createFromPlainText('1234a_');
    }).toThrow('Password must contain an uppercase letter');
  });

  it('fails when the password is missing a underscore', () => {
    expect(() => {
      Password.createFromPlainText('1234Aa');
    }).toThrow('Password must contain an underscore');
  });

  it('fails when the password is missing several requirements', () => {
    expect(() => {
      Password.createFromPlainText('abcd');
    }).toThrow(
      'Password is too short, Password must contain a number, Password must contain an uppercase letter, Password must contain an underscore',
    );
  });
  it('ensures password is hashed', () => {
    const plainText = 'SecurePass123_';
    const password = Password.createFromPlainText(plainText);
    const hashedValue = password.toString();

    expect(hashedValue).not.toBe(plainText);
    expect(hashedValue.length).toBe(64);
    expectIsHashed(hashedValue);
  });

  it('matches when some given passwords are the same', () => {
    const plainText = 'SecurePass123_';
    const password = Password.createFromPlainText(plainText);
    const anotherPassword = Password.createFromPlainText(plainText);

    expect(password.isEquals(anotherPassword)).toBe(true);
  });

  it('does not match when given passwords are differents', () => {
    const password = Password.createFromPlainText('SecurePass123_');
    const anotherPassword = Password.createFromPlainText(
      'DifferentSecurePass123_',
    );

    expect(password.isEquals(anotherPassword)).toBe(false);
  });
});

function expectIsHashed(hashedValue: string) {
  expect(/^[a-fA-F0-9]{64}$/.test(hashedValue)).toBe(true);
}
