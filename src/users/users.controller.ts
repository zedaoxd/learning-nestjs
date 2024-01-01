import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FullUserDTO } from './dto/full-user.dto';
import { SimpleUserDTO } from './dto/simple-user.dto';
import { UserRepository } from './users.repository';

@Controller('/users')
export class UsersController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const entity = await this.userRepository.save(dto);
    return new SimpleUserDTO(entity.id, entity.email, entity.name);
  }

  @Get()
  async findAll() {
    const users = await this.userRepository.findAll();

    const usersDTO = users.map(
      (user) => new SimpleUserDTO(user.id, user.email, user.name),
    );

    return usersDTO;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const entity = await this.userRepository.findOne(id);

    if (!entity)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return new FullUserDTO(
      entity.id,
      entity.email,
      entity.name,
      entity.created,
      entity.updated,
    );
  }
}
