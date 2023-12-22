import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class EncryptUnknownException extends DomainException {
  constructor(message: string) {
    super({
      name: StringValueObject.build('EncryptException'),
      message: StringValueObject.build(`Unknown error when encrypting text.`),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['EncryptException']),
      errorType: ErrorType.error(),
      metadata: { message },
    });
  }
}
