import { IsNotEmpty, MaxLength } from 'class-validator';

export class CharacteristicsProductsDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(200, {
    message: 'Description must be at most 200 characters long',
  })
  description: string;
}
