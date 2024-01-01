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

  async findOne(id: string): Promise<UserEntity | undefined> {
    const entity = this.users.find((user) => user.id === id);
    return entity;
  }

  async existisByEmail(email: string): Promise<boolean> {
    return !!this.users.find((user) => user.email === email);
  }

  async update(
    id: string,
    user: Partial<UserEntity>,
  ): Promise<UserEntity | undefined> {
    const entity = await this.findOne(id);

    if (!entity) return undefined;

    const updatedEntity = {
      ...entity,
      ...user,
      updated: new Date(),
    };

    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = updatedEntity;

    return updatedEntity;
  }

  async delete(id: string): Promise<UserEntity | undefined> {
    const entity = await this.findOne(id);

    if (!entity) return undefined;

    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);

    return entity;
  }
}
