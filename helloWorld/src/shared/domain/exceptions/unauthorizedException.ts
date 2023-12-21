import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class UnauthorizedException extends DomainException {
  constructor(userId?: string) {
    super({
      name: StringValueObject.build('UnauthorizedException'),
      message: StringValueObject.build('Unauthorized'),
      status: IntegerValueObject.build(401),
      code: StringValueObject.build(ERROR_CODES['UnauthorizedException']),
      errorType: ErrorType.error(),
      metadata: { userId },
    });
  }
}
