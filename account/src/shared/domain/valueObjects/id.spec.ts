import { Id } from '@shared/domain/valueObjects/id';

describe('Tests Id value object', () => {
  test('Test create instance object', () => {
    const newId = Id.newId();

    expect(newId).toBeDefined();
    expect(newId.value).toBeDefined();
    expect(newId.toString()).toBeDefined();
  });
});
