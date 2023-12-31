import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { UseridExists } from '../validations/user-existis.validator';
import { CharacteristicsProductsDto } from './characteristics-products.dto';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 2,
    },
    { message: 'Price must be a number and has no max two decimal places' },
  )
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 0,
    },
    { message: 'Quantity must be an integer' },
  )
  @IsPositive({ message: 'Quantity must be a positive number' })
  availableQuantity: number;

  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(200, {
    message:
      'Description must be shorter than or equal to $constraint1 characters',
  })
  description: string;

  @IsNotEmpty({ message: 'Category is required' })
  @MaxLength(50, {
    message:
      'Category must be shorter than or equal to $constraint1 characters',
  })
  category: string;

  @IsArray({ message: 'Characteristics must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CharacteristicsProductsDto)
  @ArrayMinSize(3, { message: 'Characteristics must have at least 3 items' })
  characteristics: CharacteristicsProductsDto[];

  @IsUUID('all', { message: 'User UUID is invalid' })
  @UseridExists({})
  userUUID: string;
}
