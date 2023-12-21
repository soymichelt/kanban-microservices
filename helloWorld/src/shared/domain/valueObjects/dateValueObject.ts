export class DateValueObject {
  readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static build(value: Date): DateValueObject {
    return new DateValueObject(value);
  }

  public static fromString(value: string): DateValueObject {
    const date = new Date(value);
    return new DateValueObject(date);
  }

  public static now(): DateValueObject {
    const date = new Date();
    return new DateValueObject(date);
  }

  public equals(otherDate: DateValueObject): boolean {
    const localDateParsed = Date.parse(this.toString());
    const otherDateParsed = Date.parse(otherDate.toString());
    return localDateParsed === otherDateParsed;
  }

  public toString(): string {
    return this.value.toISOString();
  }
}
