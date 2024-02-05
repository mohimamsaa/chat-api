import { Injectable, ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ValidationError } from 'class-validator';

@Injectable()
export class WSValidationPipe extends ValidationPipe {
  createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      // Here are the errors
      if (this.isDetailedOutputDisabled) {
        return new WsException('ERROR');
      }
      const errors = this.flattenValidationErrors(validationErrors);
      return new WsException(errors);
    };
  }
}
