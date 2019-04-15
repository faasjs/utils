import * as Utils from '../index';

test('Utils', () => {
  expect(Utils).toHaveProperty('Logger');
  expect(Utils).toHaveProperty('request');
});
