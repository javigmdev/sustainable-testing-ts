import { hash } from '../common/hash';
import { ValidationError } from '../common/validationError';

export class Password {
  constructor(private value: string) {}

  static createFromPlainText(plainText: string) {
    Password.ensureIsStrongPassword(plainText);
    return new Password(Password.hashPlainText(plainText));
  }

  private static hashPlainText(plainText: string): string {
    return hash(plainText);
  }

  toString() {
    return this.value;
  }

  isEquals(anotherPassword: Password): any {
    return this.value === anotherPassword.value;
  }

  private static ensureIsStrongPassword(plainText: string) {
    const errors: string[] = [];
    if (!Password.hasSixCharactersOrMore(plainText)) {
      errors.push('Password is too short');
    }
    if (!Password.containsNumber(plainText)) {
      errors.push('Password must contain a number');
    }
    if (!Password.containsLowerCase(plainText)) {
      errors.push('Password must contain a lowercase letter');
    }
    if (!Password.containsUpperCase(plainText)) {
      errors.push('Password must contain an uppercase letter');
    }
    if (!Password.containsUnderscore(plainText)) {
      errors.push('Password must contain an underscore');
    }
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }
  }

  private static hasSixCharactersOrMore(plainText: string) {
    return plainText.length >= 6;
  }

  private static containsNumber(password: string): boolean {
    return /.*\d.*/.test(password);
  }

  private static containsLowerCase(password: string): boolean {
    return /.*[a-z].*/.test(password);
  }

  private static containsUpperCase(password: string): boolean {
    return /.*[A-Z].*/.test(password);
  }

  private static containsUnderscore(password: string): boolean {
    return password.includes('_');
  }
}
