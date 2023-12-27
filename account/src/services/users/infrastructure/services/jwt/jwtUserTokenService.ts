/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserTokenDecodeException } from '@services/users/domain/exceptions/userTokenDecodeException';
import { UserTokenEncodeException } from '@services/users/domain/exceptions/userTokenEncodeException';
import { UserPayloadProps, UserTokenService } from '@services/users/domain/services/userTokenService';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

export type JwtUserTokenServiceProps = {
  privateKey: string;
};

@injectable()
export class JwtUserTokenService implements UserTokenService {
  private privateKey: string;

  constructor(props: JwtUserTokenServiceProps) {
    this.validateJwtUserTokenService(props);

    this.privateKey = props.privateKey;
  }

  public async encode(payload: UserPayloadProps): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      const expiration = 60 * 60 * 24;

      jwt.sign(
        {
          payload,
        },
        this.privateKey,
        {
          algorithm: 'RS256',
          expiresIn: expiration,
        },
        (error: Error, token: string) => {
          if (error) {
            reject(new UserTokenEncodeException(error));
          }

          resolve(token);
        },
      );
    });

    return promise;
  }

  public async decode(token: string): Promise<UserPayloadProps> {
    const promise = new Promise<UserPayloadProps>((resolve, reject) => {
      jwt.verify(token, this.privateKey, (error: Error, result: any) => {
        if (error) {
          reject(new UserTokenDecodeException(error));
        }

        return resolve(result.payload as UserPayloadProps);
      });
    });

    return promise;
  }

  private validateJwtUserTokenService(props: JwtUserTokenServiceProps): void {
    if (!props.privateKey?.trim()) {
      throw new ArgRequiredException('privateKey');
    }
  }
}
