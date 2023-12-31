import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Controller('/users')
export class UsersController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userRepository.save(dto);
  }

  @Get()
  async findAll() {
    const users = await this.userRepository.findAll();

    return users;
  }

  @Get('/:id')
  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    return user;
  }
}
