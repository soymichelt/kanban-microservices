import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class TaskNotFoundException extends DomainException {
  constructor(taskId: string) {
    super({
      name: StringValueObject.build('TaskNotFoundException'),
      message: StringValueObject.build(`Task with ID "${taskId}" not found`),
      status: IntegerValueObject.build(404),
      code: StringValueObject.build(ERROR_CODES['TaskNotFoundException']),
      errorType: ErrorType.warn(),
    });
  }
}
