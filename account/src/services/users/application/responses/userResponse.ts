import { UserPrimitivesProps } from '@services/users/domain/user';

export type UserResponse = Omit<UserPrimitivesProps, 'password'>;
