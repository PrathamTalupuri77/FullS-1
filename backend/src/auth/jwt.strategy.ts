import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token
      ignoreExpiration: false,
      secretOrKey: 'my-secret-key', // Same secret as in JwtModule
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; // Attach user info to request
  }
}
