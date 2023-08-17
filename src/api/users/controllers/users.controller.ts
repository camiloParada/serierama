import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/user.dto';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
}
