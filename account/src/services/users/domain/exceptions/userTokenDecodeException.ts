import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class UserTokenDecodeException extends DomainException {
  constructor(error: Error) {
    super({
      name: StringValueObject.build('UserTokenDecodeException'),
      message: StringValueObject.build(`An error occurred while decoding token`),
      status: IntegerValueObject.build(400),
      code: StringValueObject.build(ERROR_CODES['UserTokenDecodeException']),
      errorType: ErrorType.warn(),
      metadata: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
}
