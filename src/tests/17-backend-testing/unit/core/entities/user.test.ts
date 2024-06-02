import { User } from '../../../../../core/17-backend-testing/core/entities/user';
import { Email } from '../../../../../core/17-backend-testing/core/valueObjects/email';
import { Id } from '../../../../../core/17-backend-testing/core/valueObjects/id';
import { Password } from '../../../../../core/17-backend-testing/core/valueObjects/password';

describe('The User', () => {
  it('changes the password when a different one is provided', async () => {
    const initialPassword = Password.createFromPlainText('SafePass123_');
    const user = createUser(initialPassword);
    const newPassword = Password.createFromPlainText('AnotherSafePass123_');

    user.changePassword(newPassword);

    expect(user.isMatchingPassword(newPassword)).toBe(true);
  });

  it('does not allow to change password when the given one is the same', async () => {
    const initialPassword = Password.createFromPlainText('SafePass123_');
    const user = createUser(initialPassword);

    expect(() => {
      user.changePassword(initialPassword);
    }).toThrow('New password must be different');
  });
});

function createUser(password: Password) {
  const id = Id.generateUniqueId();
  const email = Email.create('test@example.com');
  return new User(id, email, password);
}
