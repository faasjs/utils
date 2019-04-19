import deepMerge from '../deepMerge';

describe('deepMerge', () => {
  test('should work', function () {
    const a = {
      nest: { number: 1, string: '1', object: { key: '1' }, date: new Date(1) },
    };
    const b = {
      nest: { number: 2, string: '2', object: { key: '2' }, date: new Date(2) },
    };

    expect(deepMerge(a, b)).toEqual(b);
    expect(a.nest).toEqual({ number: 1, string: '1', object: { key: '1' }, date: new Date(1) });
  });

  test('array', function () {
    expect(deepMerge({ a: [0] }, { a: [1] })).toEqual({ a: [1, 0] });
  });

  test('dup array', function () {
    expect(deepMerge({ a: { a1: [0, 1], a2: 2 } }, { a: { a1: [1, 2] } })).toEqual({ a: { a1: [1, 2, 0], a2: 2 } });
  });

  test('null object', function () {
    const a = Object.create(null);
    a.key = 1;
    const b = Object.create(null);
    b.key = 2;

    expect(deepMerge(a, b)).toEqual({ key: 2 });
  });
});
