import { generateUuid } from '../common/uuid';
import { ValidationError } from '../common/validationError';

export class Id {
  private constructor(private value: string) {}

  static generateUniqueId() {
    return new Id(generateUuid());
  }

  static createFrom(validId: string) {
    this.ensureIsValidId(validId);
    return new Id(validId);
  }

  toString() {
    return this.value;
  }

  isEquals(otherId: Id): boolean {
    return this.value === otherId.value;
  }

  private static ensureIsValidId(validId: string) {
    const validUUIDRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!validUUIDRegex.test(validId)) {
      throw new ValidationError('Invalid Id format');
    }
  }
}
