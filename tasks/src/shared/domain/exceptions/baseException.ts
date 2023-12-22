/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

type DomainExceptionPropsType = {
  name: StringValueObject;
  message: StringValueObject;
  status: IntegerValueObject;
  code: StringValueObject;
  errorType: ErrorType;
  metadata?: Record<string, any>;
};

type DomainExceptionPrimitivesType = {
  name: string;
  message: string;
  status: number;
  code: string;
  errorType: string;
  metadata?: Record<string, any>;
};

export class DomainException extends Error {
  readonly status: number;
  readonly code: string;
  readonly errorType: string;
  readonly metadata?: Record<string, any>;

  constructor(props: DomainExceptionPropsType) {
    super();

    const { name, message, status, code, errorType, metadata } = props;

    this.name = name.value;
    this.message = message.value;
    this.status = status.value;
    this.code = code.value;
    this.errorType = errorType.value;
    this.metadata = metadata;
  }

  public toPrimitives(): DomainExceptionPrimitivesType {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      errorType: this.errorType,
      metadata: this.metadata,
    };
  }
}
