import { EnumValueIsInvalidException } from '../exceptions/enumValueIsInvalidException';

export abstract class EnumValueObject<T> {
  readonly value: T;
  readonly items: T[];

  protected constructor(value: T, items: T[]) {
    this.guardIfIsValid(value, items);

    this.value = value;
    this.items = items;
  }

  private guardIfIsValid(value: T, items: T[]) {
    if (!items.includes(value)) {
      throw new EnumValueIsInvalidException(value, items);
    }
  }
}
