import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';

describe('Testing IntegerValueObject', () => {
  test('Test create integer value object', () => {
    const numberFive = IntegerValueObject.build(5);
    expect(numberFive.value).toEqual(5);
  });

  test('Test equal integer value objects', () => {
    const numberSix = IntegerValueObject.build(6);
    const sameNumber = IntegerValueObject.build(6);
    expect(numberSix.equals(sameNumber)).toBeTruthy();
  });

  test('Test distinct integer value objects', () => {
    const numberOne = IntegerValueObject.build(1);
    const numberTen = IntegerValueObject.build(10);
    expect(numberOne.equals(numberTen)).toBeFalsy();
  });
});
