import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class UserCredentialsAreInvalidException extends DomainException {
  constructor(username: string) {
    super({
      name: StringValueObject.build('UserCredentialsAreInvalidException'),
      message: StringValueObject.build(`Username or password invalid`),
      status: IntegerValueObject.build(400),
      code: StringValueObject.build(ERROR_CODES['UserCredentialsAreInvalidException']),
      errorType: ErrorType.warn(),
      metadata: { username },
    });
  }
}
