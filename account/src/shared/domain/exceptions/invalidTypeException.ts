import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class InvalidTypeException extends DomainException {
  constructor(typeName: string) {
    super({
      name: StringValueObject.build('InvalidTypeException'),
      message: StringValueObject.build(`The type is valid. You need to pass a type "${typeName}"`),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['InvalidTypeException']),
      errorType: ErrorType.error(),
    });
  }
}
