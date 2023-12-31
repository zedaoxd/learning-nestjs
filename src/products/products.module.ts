import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { UserExistsValidator } from './validations/user-existis.validator';

@Module({
  imports: [UsersModule],
  controllers: [ProductsController],
  providers: [ProductsRepository, UserExistsValidator],
})
export class ProductsModule {}
