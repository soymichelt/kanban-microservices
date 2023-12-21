import { CryptoEncriptionService } from '@shared/infrastructure/services/encription/cryptoEncriptionService';

describe('Tests CryptoEncriptionService', () => {
  let encriptionService: CryptoEncriptionService;

  beforeAll(() => {
    encriptionService = new CryptoEncriptionService({
      secretKey: '12345',
      secretIV: '12345',
    });
  });

  test('Test: Encripting password', async () => {
    const encryptedPassword = await encriptionService.encrypt('SoymichelDev');
    expect(encryptedPassword).toBeDefined();
  });

  test('Test: Decrypting password', async () => {
    const decryptedPassword = await encriptionService.decrypt('MTUxNTVjNmZlZDUwM2E5ZDZjNjA3ZGQ0MDM3YmY2NDE=');
    expect(decryptedPassword).toEqual('SoymichelDev');
  });
});
