import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class DecryptUnknownException extends DomainException {
  constructor(message: string) {
    super({
      name: StringValueObject.build('DecryptUnknownException'),
      message: StringValueObject.build(`Unknown error when decrypting text.`),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['DecryptUnknownException']),
      errorType: ErrorType.error(),
      metadata: { message },
    });
  }
}
