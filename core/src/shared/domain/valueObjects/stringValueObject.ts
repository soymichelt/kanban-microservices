export class StringValueObject {
  readonly value: string;

  protected constructor(value: string) {
    this.guardIfString(value);

    this.value = value;
  }

  public static build(value: string): StringValueObject {
    return new StringValueObject(value);
  }

  private guardIfString(value: string): void {
    if (typeof value !== 'string') {
      throw new Error();
    }
  }
}
