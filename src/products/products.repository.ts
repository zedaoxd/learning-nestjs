import { Injectable } from '@nestjs/common';

type Characteristics = {
  name: string;
  description: string;
};

type Product = {
  id?: string;
  name: string;
  value: number;
  quntityAvailable: number;
  description: string;
  characteristics: Characteristics[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ProductsRepository {
  private products = [];

  async save(product: Product) {
    this.products.push(product);
  }
  async findAll() {
    return this.products;
  }

  async findOne(id: string) {
    return this.products.find((product) => product.id === id);
  }
}
