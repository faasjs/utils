import Utils from '../index';

test('Utils', () => {
  expect(Utils).toHaveProperty('logger');
  expect(Utils).toHaveProperty('request');
});
