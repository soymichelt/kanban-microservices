export interface KeyStoreService {
  get(keys: string[]): Promise<string[]>;
}
