import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class UserTokenEncodeException extends DomainException {
  constructor(error: Error) {
    super({
      name: StringValueObject.build('UserTokenEncodeException'),
      message: StringValueObject.build(`An error occurred while encoding token`),
      status: IntegerValueObject.build(400),
      code: StringValueObject.build(ERROR_CODES['UserTokenEncodeException']),
      errorType: ErrorType.warn(),
      metadata: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
}
