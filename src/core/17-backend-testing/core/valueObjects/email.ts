import { ValidationError } from '../common/validationError';

export class Email {
  private constructor(private address: string) {}

  static create(address: string) {
    Email.ensureIsValidEmail(address);
    return new Email(address);
  }

  private static ensureIsValidEmail(address: string) {
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmailRegex.test(address)) {
      throw new ValidationError('Invalid email format');
    }
  }

  toString() {
    return this.address;
  }

  isEqual(otherEmail: Email): any {
    return this.address === otherEmail.address;
  }
}
