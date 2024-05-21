import { sumNumbers } from '../../core/09-kata-string-calculator/stringCalculator';

describe('The string calculator', () => {
  it('does not increment the total in case of null or empty expression', () => {
    expect(sumNumbers(null)).toBe(0);
    expect(sumNumbers('')).toBe(0);
  });
  it('converts number in strings to number type', () => {
    expect(sumNumbers('1')).toBe(1);
  });
  it('sums all numbers separated by commas', () => {
    expect(sumNumbers('1,2')).toBe(3);
    expect(sumNumbers('1,2,3')).toBe(6);
  });
  it('does not increment the total in case of nom numeric symbol', () => {
    expect(sumNumbers('a')).toBe(0);
    expect(sumNumbers('1,a')).toBe(1);
    expect(sumNumbers('1,a,2')).toBe(3);
  });
  it('sums all the numbers separated by custom separator', () => {
    expect(sumNumbers('//#/3#2')).toBe(5);
    expect(sumNumbers('//#/3,2')).toBe(0);
    expect(sumNumbers('//%/1%2%3')).toBe(6);
  });
});
