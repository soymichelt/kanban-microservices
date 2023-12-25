import { UserAuthVerifiedEvent } from '@services/auth/domain/events/userAuthVerifiedEvent';
import { UserId } from '@services/auth/domain/valueObjects/userId';
import { UserRole } from '@services/auth/domain/valueObjects/userRole';
import { UserRoleVerificationType } from '@services/auth/domain/valueObjects/userRoleVerification';
import { UserToken } from '@services/auth/domain/valueObjects/userToken';
import { AggregateRoot } from '@shared/domain/aggregateRoot';

type UserAuthProps = {
  userId: UserId;
  token: UserToken;
  roles?: UserRole[];
};

export type UserAuthPrimitives = {
  userId: string;
  token: string;
  roles?: string[];
};

export class UserAuth extends AggregateRoot {
  readonly userId: UserId;
  readonly token: UserToken;
  private roles: UserRole[];

  private constructor(props: UserAuthProps) {
    super();

    this.userId = props.userId;
    this.token = props.token;
    this.roles = props.roles || [];
  }

  public static build(props: UserAuthProps): UserAuth {
    return new UserAuth(props);
  }

  public static fromPrimitives(props: UserAuthPrimitives): UserAuth {
    return new UserAuth({
      userId: UserId.fromString(props.userId),
      token: UserToken.build(props.token),
      roles: props.roles?.map((role) => UserRole.build(role)) || [],
    });
  }

  public verifyRole(_roleToVerified: UserRole): UserRoleVerificationType {
    // const verificationType = this.roles.find(role => role.equals(roleToVerified))
    //   ? UserRoleVerificationType.allow()
    //   : UserRoleVerificationType.deny();

    const verificationType = UserRoleVerificationType.allow();

    const event = UserAuthVerifiedEvent.build(this, verificationType);
    this.pushEvent(event);

    return verificationType;
  }

  public toPrimitives() {
    return {
      userId: this.userId.toString(),
      token: this.token.value,
      roles: this.roles.map((role) => role.value),
    };
  }
}
