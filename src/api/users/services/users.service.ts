import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    return data;
  }

  async update(id: string, changes: UpdateUserDto) {
    return id + changes;
  }

  remove(id: string) {
    return id;
  }
}
