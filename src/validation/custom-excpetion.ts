import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function createCustomExceptionFactory(errors: ValidationError[]) {
  const messages = errors.map((error) => {
    if (error.constraints) {
      return {
        property: error.property,
        message: ` Property "${error.property}" has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`,
      };
    } else {
      return {
        property: error.property,
        message: `Property "${error.property}" is an invalid property`,
      };
    }
  });
  return new BadRequestException(messages);
}
