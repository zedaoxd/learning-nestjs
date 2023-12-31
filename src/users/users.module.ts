import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserRepository],
})
export class UsersModule {}
