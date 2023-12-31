import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../users.repository';

@Injectable()
@ValidatorConstraint({
  async: true,
})
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userExistis = await this.userRepository.existisByEmail(email);

    return !userExistis;
  }

  defaultMessage(): string {
    return 'Email already exists';
  }
}

export const EmailUnique = (options: ValidationOptions) => {
  return (object: any, email: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: email,
      options,
      constraints: [],
      validator: EmailUniqueValidator,
    });
  };
};
