import { EnumValueObject } from './enumValueObject';

enum ErrorTypeEnum {
  warn = 'warn',
  error = 'error',
}

const ERROR_TYPE_ENUM_VALUES = Object.values(ErrorTypeEnum);

export class ErrorType extends EnumValueObject<ErrorTypeEnum> {
  public static build(value: ErrorTypeEnum): ErrorType {
    return new ErrorType(value, ERROR_TYPE_ENUM_VALUES);
  }

  public static warn(): ErrorType {
    return new ErrorType(ErrorTypeEnum.warn, ERROR_TYPE_ENUM_VALUES);
  }

  public static error(): ErrorType {
    return new ErrorType(ErrorTypeEnum.error, ERROR_TYPE_ENUM_VALUES);
  }
}
