import {
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '../../../core/17-backend-testing/application/dtos';
import { UserRegistrationService } from '../../../core/17-backend-testing/application/userRegistrationService';
import { InMemoryUserRepository } from '../../../core/17-backend-testing/core/repositories/userRepository';
import {
  HttpRequest,
  HttpResponse,
} from '../../../core/17-backend-testing/infrastructure/http';
import { UserRegistrationController } from '../../../core/17-backend-testing/infrastructure/userRegistrationController';

describe('The User Registration Controller', () => {
  const userRegistrationController = createUserRegistrationController();

  it('registers a new user when email and password are valid', async () => {
    const email = 'test@test.com';
    const password = 'TestPass123_';
    const request = createRequest({ email, password });
    const res = createMockedResponse();

    await userRegistrationController.register(request, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String), email }),
    );
  });

  it('rejects registration when email is not provided', async () => {
    const request = createRequest({
      password: 'TestPass123_',
    });
    const res = createMockedResponse();

    await userRegistrationController.register(request, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email and password are required.',
    });
  });

  it('rejects registration when password is not provided', async () => {
    const request = createRequest({
      email: 'test@test.com',
    });
    const res = createMockedResponse();

    await userRegistrationController.register(request, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email and password are required.',
    });
  });

  it('rejects registration when both email and password are not provided', async () => {
    const request = createRequest({});
    const res = createMockedResponse();

    await userRegistrationController.register(request, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email and password are required.',
    });
  });
});

function createMockedResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as HttpResponse<UserRegistrationResponse>;
}

function createRequest({
  email,
  password,
}: {
  email?: string;
  password?: string;
}) {
  return { body: { email, password } } as HttpRequest<UserRegistrationRequest>;
}

function createUserRegistrationController() {
  const userRepository = new InMemoryUserRepository();
  const userRegistrationService = new UserRegistrationService(userRepository);
  return new UserRegistrationController(userRegistrationService);
}
