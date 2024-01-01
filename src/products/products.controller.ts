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
import { CreateProductDto } from './dto/create-products.dto';
import { FullProductsDTO } from './dto/full-products.dto';
import { SimpleProductsDTO } from './dto/simple-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { ProductsRepository } from './products.repository';

@Controller('/products')
export class ProductsController {
  constructor(private readonly repository: ProductsRepository) {}

  @Get()
  async findAll(): Promise<SimpleProductsDTO[]> {
    const products = await this.repository.findAll();
    const productsDTO = products.map(
      (product) =>
        new SimpleProductsDTO(
          product.id,
          product.name,
          product.price,
          product.availableQuantity,
          product.description,
          product.category,
          product.userUUID,
        ),
    );

    return productsDTO;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<FullProductsDTO> {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return new FullProductsDTO(
      entity.id,
      entity.name,
      entity.price,
      entity.availableQuantity,
      entity.description,
      entity.category,
      entity.userUUID,
      entity.characteristics,
    );
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<FullProductsDTO> {
    const entity = await this.repository.save(dto);

    return new FullProductsDTO(
      entity.id,
      entity.name,
      entity.price,
      entity.availableQuantity,
      entity.description,
      entity.category,
      entity.userUUID,
      entity.characteristics,
    );
  }

  @Put('/:id')
  async update(
    @Body() dto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<FullProductsDTO> {
    const entity = await this.repository.update(id, dto);

    if (!entity)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return new FullProductsDTO(
      entity.id,
      entity.name,
      entity.price,
      entity.availableQuantity,
      entity.description,
      entity.category,
      entity.userUUID,
      entity.characteristics,
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    const entity = await this.repository.delete(id);

    if (!entity)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
