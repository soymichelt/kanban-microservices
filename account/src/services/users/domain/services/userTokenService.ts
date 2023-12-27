export type UserPayloadProps = {
  userId: string;
  username: string;
  email: string;
  phone?: string;

  createdAt: string;
  updatedAt: string;
};

export interface UserTokenService {
  encode(user: UserPayloadProps): Promise<string>;
  verifyAndDecode(token: string): Promise<UserPayloadProps>;
}
