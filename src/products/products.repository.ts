import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsRepository {
  private products = [];

  async save(product: CreateProductDto) {
    const newProduct = {
      ...product,
      id: randomUUID(),
    };

    this.products.push(newProduct);

    return newProduct;
  }
  async findAll() {
    return this.products;
  }

  async findOne(id: string) {
    return this.products.find((product) => product.id === id);
  }
}
