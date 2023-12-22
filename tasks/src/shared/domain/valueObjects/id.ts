import { ObjectId } from 'mongodb';

export class Id {
  readonly value: ObjectId;

  protected constructor(value: ObjectId) {
    this.value = value;
  }

  public static build(value: ObjectId): Id {
    return new Id(value);
  }

  public static fromString(value: string): Id {
    if (!ObjectId.isValid(value)) {
      throw new Error();
    }

    const objectId = new ObjectId(value);
    return new Id(objectId);
  }

  public static newId(): Id {
    const objectId = new ObjectId();
    return new Id(objectId);
  }

  public toString(): string {
    return this.value?.toString();
  }
}
