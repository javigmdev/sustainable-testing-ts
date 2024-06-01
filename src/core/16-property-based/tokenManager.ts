import * as jwt from 'jsonwebtoken';

export class TokenManager {
  constructor(
    private readonly secretKey: string,
    private readonly expirationInSeconds: number,
  ) {}

  generateToken(payload: object) {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expirationInSeconds,
    });
  }

  decodeToken(token: string) {
    return jwt.verify(token, this.secretKey);
  }
}
