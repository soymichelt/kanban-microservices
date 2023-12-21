/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class EnumValueIsInvalidException extends DomainException {
  constructor(value: any, items: any[]) {
    super({
      name: StringValueObject.build('EnumValueIsInvalidException'),
      message: StringValueObject.build(`The enum "${value}" value is valid. Allowed values: "${items.join(', ')}"`),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['EnumValueIsInvalidException']),
      errorType: ErrorType.error(),
    });
  }
}
