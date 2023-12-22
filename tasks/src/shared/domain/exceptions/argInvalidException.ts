import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class ArgInvalidException extends DomainException {
  constructor(argName: string, argValue: string) {
    super({
      name: StringValueObject.build('ArgInvalidException'),
      message: StringValueObject.build(`The value "${argValue}" for the field "${argName}" is invalid`),
      status: IntegerValueObject.build(400),
      code: StringValueObject.build(ERROR_CODES['ArgInvalidException']),
      errorType: ErrorType.warn(),
    });
  }
}
