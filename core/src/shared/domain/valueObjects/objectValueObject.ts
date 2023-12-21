/* eslint-disable @typescript-eslint/no-explicit-any */
export class ObjectValueObject {
  readonly value: Record<string, any>;

  protected constructor(value: Record<string, any>) {
    this.value = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static build(value: Record<string, any>): ObjectValueObject {
    return new ObjectValueObject(value);
  }

  public static fromString(value: string): ObjectValueObject {
    return new ObjectValueObject(JSON.parse(value));
  }

  public toString(): string {
    return JSON.stringify(this.value);
  }
}
