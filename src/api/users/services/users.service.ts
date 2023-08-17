import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll() {
    return;
  }

  async findOne(id: string) {
    return id;
  }

  findByEmail(email: string) {
    return email;
  }

  async create(data: CreateUserDto) {
    try {
      const newUser = this.userRepo.create(data);
      const hashPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashPassword;

      return this.userRepo.save(newUser);
    } catch (error) {
      throw new HttpException(
        'There was an error trying to save register',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, changes: UpdateUserDto) {
    return id + changes;
  }

  remove(id: string) {
    return id;
  }
}
