import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  private users = [];

  async save(user: CreateUserDto) {
    const newUser = {
      ...user,
      id: randomUUID(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
