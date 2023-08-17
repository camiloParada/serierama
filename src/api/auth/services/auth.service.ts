import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PayloadToken } from './../models/token.model';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { ...rta } = user;
        return rta;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = {
      id: user.id,
      name: user.fullname,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
