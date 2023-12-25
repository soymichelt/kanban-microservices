import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { DecryptUnknownException } from '@shared/domain/exceptions/decryptUnknownException';
import { EncryptUnknownException } from '@shared/domain/exceptions/encryptUnknownException';
import { EncriptionService } from '@shared/domain/services/encriptionService';
import * as Crypto from 'crypto';
import { injectable } from 'tsyringe';

type CryptoEncriptionServiceProps = {
  secretKey: string;
  secretIV: string;
  method?: string;
};

@injectable()
export class CryptoEncriptionService implements EncriptionService {
  private static METHOD_DEFAULT: string = 'aes-256-cbc';

  private readonly secretKey: string;
  private readonly secretIV: string;
  private readonly method: string;

  constructor(props: CryptoEncriptionServiceProps) {
    this.validateEncriptionService(props);

    this.secretKey = props.secretKey;
    this.secretIV = props.secretIV;
    this.method = props.method || CryptoEncriptionService.METHOD_DEFAULT;
  }

  public async encrypt(textToCipher: string): Promise<string> {
    try {
      const key = this.createKey();
      const encriptionIV = this.createEncriptionIV();

      const cipherResult = Crypto.createCipheriv(this.method, key, encriptionIV);

      const ciphertext = Buffer.from(
        cipherResult.update(textToCipher, 'utf-8', 'hex') + cipherResult.final('hex'),
      ).toString('base64');

      return ciphertext;
    } catch (error) {
      throw new EncryptUnknownException(error.message);
    }
  }

  public async decrypt(ciphertext: string): Promise<string> {
    try {
      const key = this.createKey();
      const encriptionIV = this.createEncriptionIV();

      const buffer = Buffer.from(ciphertext, 'base64');
      const decipherResult = Crypto.createDecipheriv(this.method, key, encriptionIV);

      const deciphertext =
        decipherResult.update(buffer.toString('utf-8'), 'hex', 'utf8') + decipherResult.final('utf-8');

      return deciphertext;
    } catch (error) {
      throw new DecryptUnknownException(error.message);
    }
  }

  private validateEncriptionService(props: CryptoEncriptionServiceProps): void {
    if (!props.secretKey || !props.secretIV) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([key, value]) => !value && key === 'method')
          .map(([key]) => key),
      );
    }
  }

  private createKey(): string {
    const key = Crypto.createHash('sha512').update(this.secretKey).digest('hex').substring(0, 32);
    return key;
  }

  private createEncriptionIV(): string {
    const encriptionIV = Crypto.createHash('sha512').update(this.secretIV).digest('hex').substring(0, 16);

    return encriptionIV;
  }
}
