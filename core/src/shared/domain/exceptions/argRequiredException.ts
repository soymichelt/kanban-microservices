import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class ArgRequiredException extends DomainException {
  constructor(args: string | string[]) {
    super({
      name: StringValueObject.build('ArgRequiredException'),
      message: StringValueObject.build(
        `The following arguments are required: ${typeof args === 'string' ? args : args.join(', ')}`,
      ),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['ArgRequiredException']),
      errorType: ErrorType.error(),
    });
  }
}
