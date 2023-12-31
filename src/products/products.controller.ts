import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
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
  async create(@Body() dto: CreateProductDto) {
    return await this.repository.save(dto);
  }
}
