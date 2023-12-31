import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
@ValidatorConstraint({
  async: true,
})
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(
    uuid: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userExistis = await this.userRepository.findOne(uuid);

    return !!userExistis;
  }

  defaultMessage(): string {
    return 'User id does not exists';
  }
}

export const UseridExists = (options: ValidationOptions) => {
  return (object: any, uuid: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: uuid,
      options,
      constraints: [],
      validator: UserExistsValidator,
    });
  };
};
