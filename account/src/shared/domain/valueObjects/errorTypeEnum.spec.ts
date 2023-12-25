import { ErrorType, ErrorTypeEnum } from '@shared/domain/valueObjects/errorTypeEnum';

describe('Tests ErrorTypeEnum', () => {
  test('Test create instance object', () => {
    const errorType = ErrorType.build('error' as ErrorTypeEnum);

    expect(errorType.value).toEqual('error');
  });

  describe('Testing named constructor', () => {
    test('Testing error', () => {
      const errorType = ErrorType.error();

      expect(errorType.value).toEqual('error');
    });

    test('Testing warn', () => {
      const errorType = ErrorType.warn();

      expect(errorType.value).toEqual('warn');
    });
  });
});
