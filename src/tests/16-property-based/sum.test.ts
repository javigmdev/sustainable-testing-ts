import fc from 'fast-check';
import { sum } from '../../core/16-property-based/sum';

describe('The properties of sum', () => {
  test('Zero is the neutral element', () => {
    fc.assert(
      fc.property(fc.integer(), a => {
        expect(sum(a, 0)).toEqual(a);
      }),
    );
  });

  test('Sum is commutative', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        expect(sum(a, b)).toEqual(sum(b, a));
      }),
    );
  });

  test('Sum is associative', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
        expect(sum(sum(a, b), c)).toEqual(sum(a, sum(b, c)));
      }),
    );
  });
});
