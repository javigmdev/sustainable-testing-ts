import { UserRegistrationRequest } from '../../../../core/17-backend-testing/application/dtos';
import { UserRegistrationService } from '../../../../core/17-backend-testing/application/userRegistrationService';
import { InMemoryUserRepository } from '../../../../core/17-backend-testing/core/repositories/userRepository';
import { Email } from '../../../../core/17-backend-testing/core/valueObjects/email';

describe('The User Registration Service', () => {
  let userRepository: InMemoryUserRepository;
  let userRegistrationService: UserRegistrationService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    userRegistrationService = new UserRegistrationService(userRepository);
  });

  it('registers a new user successfully', async () => {
    const registrationRequest: UserRegistrationRequest = {
      email: 'test@example.com',
      password: 'TestPass123_',
    };

    await userRegistrationService.register(registrationRequest);

    const storedUser = await userRepository.findByEmail(
      Email.create(registrationRequest.email),
    );
    expect(
      storedUser.isMatchingEmail(Email.create(registrationRequest.email)),
    ).toBe(true);
  });

  it('does not allow to register an user when an user with the same email already exists', async () => {
    const registrationRequest: UserRegistrationRequest = {
      email: 'test@example.com',
      password: 'TestPass123_',
    };
    await userRegistrationService.register(registrationRequest);

    await expect(
      userRegistrationService.register(registrationRequest),
    ).rejects.toThrow('User already exists with this email.');
  });
});
