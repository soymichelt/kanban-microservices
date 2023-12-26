import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class UserNotFoundException extends DomainException {
  constructor(userId: string) {
    super({
      name: StringValueObject.build('UserNotFoundException'),
      message: StringValueObject.build(`User not found`),
      status: IntegerValueObject.build(400),
      code: StringValueObject.build(ERROR_CODES['UserNotFoundException']),
      errorType: ErrorType.error(),
      metadata: { userId },
    });
  }
}
