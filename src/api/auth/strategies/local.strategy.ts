import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './../services/auth.service';
import { Strategy } from 'passport-local';
import config from 'src/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
    @Inject(config.KEY) configService: ConfigType<typeof config>,
  ) {
    super({
      usernameField: configService.jwt.usernameField,
      passwordField: configService.jwt.passwordField,
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException('Access denied', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
