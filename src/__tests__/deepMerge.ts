import deepMerge from '../deepMerge';

describe('deepMerge', () => {
  test('object nested key', function () {
    expect(deepMerge({ a: { a1: 1, a2: 2 } }, { a: { a1: 2 } })).toEqual({ a: { a1: 2, a2: 2 } });
  });

  test('array', function () {
    expect(deepMerge({ a: { a1: [0], a2: 2 } }, { a: { a1: [1] } })).toEqual({ a: { a1: [0, 1], a2: 2 } });
  });

  test('dup array', function () {
    expect(deepMerge({ a: { a1: [0, 1], a2: 2 } }, { a: { a1: [1, 2] } })).toEqual({ a: { a1: [0, 1, 2], a2: 2 } });
  });
});
