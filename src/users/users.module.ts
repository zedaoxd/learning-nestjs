import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { EmailUniqueValidator } from './validations/email-unique.validator';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserRepository, EmailUniqueValidator],
})
export class UsersModule {}
