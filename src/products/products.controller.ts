import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProductsRepository } from './products.repository';

@Controller('/products')
export class ProductsController {
  constructor(private readonly repository: ProductsRepository) {}

  @Get()
  async findAll() {
    const products = await this.repository.findAll();

    return products;
  }

  @Get('/:id')
  async findOne(id: string) {
    const product = await this.repository.findOne(id);

    return product;
  }

  @Post()
  async create(@Body() dto: any) {
    const newProduct = {
      ...dto,
      id: randomUUID(),
    };

    await this.repository.save(newProduct);

    return newProduct;
  }
}
