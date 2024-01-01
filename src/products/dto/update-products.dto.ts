import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { UUID } from 'crypto';
import { UseridExists } from '../validations/user-existis.validator';
import { CharacteristicsProductsDTO } from './characteristics-products.dto';

export class UpdateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsOptional()
  name: string;

  @IsOptional()
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
  @IsOptional()
  availableQuantity: number;

  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(200, {
    message:
      'Description must be shorter than or equal to $constraint1 characters',
  })
  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'Category is required' })
  @MaxLength(50, {
    message:
      'Category must be shorter than or equal to $constraint1 characters',
  })
  @IsOptional()
  category: string;

  @IsArray({ message: 'Characteristics must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CharacteristicsProductsDTO)
  @ArrayMinSize(3, { message: 'Characteristics must have at least 3 items' })
  @IsOptional()
  characteristics: CharacteristicsProductsDTO[];

  @IsUUID('all', { message: 'User UUID is invalid' })
  @UseridExists({})
  @IsOptional()
  userUUID: UUID;
}
