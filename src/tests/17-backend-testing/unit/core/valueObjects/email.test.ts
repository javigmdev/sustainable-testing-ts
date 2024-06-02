import { Email } from '../../../../../core/17-backend-testing/core/valueObjects/email';

describe('The Email', () => {
  it('creates an email for a given address in a correct format', () => {
    const address = 'example@example.com';
    const email = Email.create(address);
    expect(email.toString()).toEqual(address);
  });

  it('does not allow creating an email for a given incorrectly formatted address', () => {
    expect(() => {
      Email.create('invalid');
    }).toThrow('Invalid email format');
  });

  it('considers two emails with the same address as equals', () => {
    const email = Email.create('example@example.com');
    const otherEmail = Email.create('example@example.com');
    expect(email.isEqual(otherEmail)).toBe(true);
  });

  it('differentiates between two emails with different address', () => {
    const email = Email.create('example@example.com');
    const otherEmail = Email.create('otherexample@example.com');
    expect(email.isEqual(otherEmail)).toBe(false);
  });
});
