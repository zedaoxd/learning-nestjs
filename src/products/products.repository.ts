import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDto } from './dto/create-products.dto';
import { ProductEntity } from './products.entity';

@Injectable()
export class ProductsRepository {
  private products: ProductEntity[] = [];

  async save(product: CreateProductDto): Promise<ProductEntity> {
    const newProduct: ProductEntity = {
      ...product,
      id: randomUUID(),
      created: new Date(),
      updated: new Date(),
    };

    this.products.push(newProduct);

    return newProduct;
  }
  async findAll(): Promise<ProductEntity[]> {
    return this.products;
  }

  async findOne(id: string): Promise<ProductEntity | undefined> {
    return this.products.find((product) => product.id === id);
  }

  async update(
    id: string,
    product: Partial<ProductEntity>,
  ): Promise<ProductEntity | undefined> {
    const entity = await this.findOne(id);

    if (!entity) return undefined;

    const updatedEntity = {
      ...entity,
      ...product,
      updated: new Date(),
    };

    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = updatedEntity;

    return updatedEntity;
  }

  async delete(id: string): Promise<ProductEntity | undefined> {
    const entity = await this.findOne(id);

    if (!entity) return undefined;

    const index = this.products.findIndex((product) => product.id === id);
    this.products.splice(index, 1);

    return entity;
  }
}
