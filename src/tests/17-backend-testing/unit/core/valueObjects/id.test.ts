import { generateUuid } from '../../../../../core/17-backend-testing/core/common/uuid';
import { Id } from '../../../../../core/17-backend-testing/core/valueObjects/id';

describe('The Id Value Object', () => {
  it('generates a valid identifier', () => {
    const id = Id.generateUniqueId();
    expectThatIdIsUUID(id);
  });

  it('creates an ID from agiven valid identifier', () => {
    const validId = generateUuid();
    const id = Id.createFrom(validId);
    expect(id.toString()).toBe(validId);
  });

  it('does not allow to create an ID from agiven valid identifier', () => {
    const invalidId = 'invalid-id';
    expect(() => {
      Id.createFrom(invalidId);
    }).toThrow('Invalid Id format');
  });

  it('identifies two identical ids as equal', () => {
    const validId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const id1 = Id.createFrom(validId);
    const id2 = Id.createFrom(validId);
    expect(id1.isEquals(id2)).toBe(true);
  });

  it('distinguishes two different ids', () => {
    const id1 = Id.generateUniqueId();
    const id2 = Id.generateUniqueId();
    expect(id1.isEquals(id2)).toBe(false);
  });
});

function expectThatIdIsUUID(id: Id) {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  expect(id.toString()).toMatch(regex);
}
