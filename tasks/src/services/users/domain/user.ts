import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';
import { UserId } from '@shared/domain/valueObjects/userId';

import { UserName } from './valueObjects/userName';

export type UserProps = {
  userId: UserId;
  username: UserName;
  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type UserPrimitives = {
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export class User extends AggregateRoot {
  readonly userId: UserId;
  readonly username: UserName;

  private constructor(props: UserProps) {
    super();

    this.userId = props.userId;
    this.username = props.username;
    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public static build(props: UserProps): User {
    return new User(props);
  }

  public static fromPrimitives(props: UserPrimitives): User {
    return new User({
      userId: UserId.fromString(props.userId),
      username: UserName.build(props.username),
      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public toPrimitives(): UserPrimitives {
    return {
      userId: this.userId.toString(),
      username: this.username.value,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
