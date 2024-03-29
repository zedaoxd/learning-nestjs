import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmailUnique } from '../validations/email-unique.validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsOptional()
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email' })
  @EmailUnique({})
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsOptional()
  password: string;
}
