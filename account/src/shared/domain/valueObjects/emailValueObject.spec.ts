import { EmailValueObject } from '@shared/domain/valueObjects/emailValueObject';

describe('Tests EmailValueObject', () => {
  test('Test create instance object', () => {
    const email = EmailValueObject.build('mtraatabladaa94@gmail.com');

    expect(email.value).toEqual('mtraatabladaa94@gmail.com');
  });

  test('Test throw create invalid email', () => {
    expect(() => EmailValueObject.build('mtraatabladaa94%gmail.com')).toThrow(
      `The value "mtraatabladaa94%gmail.com" for the field "EmailValueObject" is invalid`,
    );
  });
});
