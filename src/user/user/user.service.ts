import { Injectable } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import z from 'zod';

@Injectable()
export class UserService {
  constructor(private validationService: ValidationService) {}

  sayHello(firstName: string, lastName: string): string {
    const schema = z.string().min(3).max(50);
    const validFirstName = this.validationService.validate(schema, firstName);
    const validLastName = this.validationService.validate(schema, lastName);
    return `Hello ${validFirstName} ${validLastName}`;
  }
}
