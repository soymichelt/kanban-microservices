import { EnumValueObject } from '@shared/domain/valueObjects/enumValueObject';

export enum UserRoleVerificationTypeEnum {
  allow = 'Allow',
  deny = 'Deny',
  unauthorized = 'Unauthorized',
}

const USER_ROLE_VERIFICATION_TYPE_ENUM_VALUES = Object.values(UserRoleVerificationTypeEnum);

export class UserRoleVerificationType extends EnumValueObject<UserRoleVerificationTypeEnum> {
  public static build(value: UserRoleVerificationTypeEnum): UserRoleVerificationType {
    return new UserRoleVerificationType(value, USER_ROLE_VERIFICATION_TYPE_ENUM_VALUES);
  }

  public static allow(): UserRoleVerificationType {
    return new UserRoleVerificationType(UserRoleVerificationTypeEnum.allow, USER_ROLE_VERIFICATION_TYPE_ENUM_VALUES);
  }

  public static deny(): UserRoleVerificationType {
    return new UserRoleVerificationType(UserRoleVerificationTypeEnum.deny, USER_ROLE_VERIFICATION_TYPE_ENUM_VALUES);
  }

  public static unauthorized(): UserRoleVerificationType {
    return new UserRoleVerificationType(
      UserRoleVerificationTypeEnum.unauthorized,
      USER_ROLE_VERIFICATION_TYPE_ENUM_VALUES,
    );
  }
}
