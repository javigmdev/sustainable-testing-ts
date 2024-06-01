import { anything, check, dictionary, property, string } from 'fast-check';
import { TokenManager } from '../../core/16-property-based/tokenManager';

describe('The token manager', (): void => {
  const tokenManager: TokenManager = new TokenManager('mySuperSecretKey', 10);

  test('a generated token contains the original payload when decoded', () => {
    check(
      property(dictionary(string(), anything()), payload => {
        const token = tokenManager.generateToken(payload);
        const decodedPayload = tokenManager.decodeToken(token);
        expect(decodedPayload).toEqual(payload);
      }),
    );
  });

  test('a token decoded with an incorrect key results in an error', () => {
    const tokenManagerWithIncorrectSecret: TokenManager = new TokenManager(
      'incorrectSecretKey',
      10,
    );
    check(
      property(dictionary(string(), anything()), payload => {
        const token = tokenManager.generateToken(payload);
        expect(() =>
          tokenManagerWithIncorrectSecret.decodeToken(token),
        ).toThrow();
      }),
    );
  });
  test('a manipulated token results in an error when decoded', () => {
    check(
      property(
        dictionary(string(), anything()),
        string(),
        (payload, extraData) => {
          const token = tokenManager.generateToken(payload);
          const manipulatedToken = token + extraData;
          expect(() => tokenManager.decodeToken(manipulatedToken)).toThrow();
        },
      ),
    );
  });
});
