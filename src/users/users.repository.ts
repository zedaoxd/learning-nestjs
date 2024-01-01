import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: CreateUserDto) {
    const newUser: UserEntity = {
      ...user,
      id: randomUUID(),
      created: new Date(),
      updated: new Date(),
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

  async existisByEmail(email: string): Promise<boolean> {
    return !!this.users.find((user) => user.email === email);
  }
}
