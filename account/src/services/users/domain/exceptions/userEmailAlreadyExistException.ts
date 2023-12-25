import { UserEmail } from '@services/users/domain/valueObjects/userEmail';
import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class UserEmailAlreadyExistException extends DomainException {
  constructor(email: UserEmail) {
    super({
      name: StringValueObject.build('UserEmailAlreadyExistException'),
      message: StringValueObject.build(`There is already a user with this same email`),
      status: IntegerValueObject.build(400),
      code: StringValueObject.build(ERROR_CODES['UserEmailAlreadyExistException']),
      errorType: ErrorType.warn(),
      metadata: { email: email.value },
    });
  }
}
