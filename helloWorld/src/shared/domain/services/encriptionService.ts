export interface EncriptionService {
  encrypt(textToCipher: string): Promise<string>;
  decrypt(ciphertext: string): Promise<string>;
}
