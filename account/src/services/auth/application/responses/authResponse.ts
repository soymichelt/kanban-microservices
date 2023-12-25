import { UserAuthPrimitives } from '@services/auth/domain/auth';
import { UserRoleVerificationTypeEnum } from '@services/auth/domain/valueObjects/userRoleVerification';

export type AuthResponse = {
  verificationType: UserRoleVerificationTypeEnum;
  auth?: UserAuthPrimitives;
};
