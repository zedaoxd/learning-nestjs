import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { FullUserDTO } from './dto/full-user.dto';
import { SimpleUserDTO } from './dto/simple-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const entity = await this.userRepository.update(id, dto);

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

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    const entity = await this.userRepository.delete(id);

    if (!entity)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
