import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // Here we are authenticating the user
    // by using the email and password
    // using the LocalStrategy that is provided by passport-local library.
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(['invalid credentials']);
    }

    return user;
  }
}
