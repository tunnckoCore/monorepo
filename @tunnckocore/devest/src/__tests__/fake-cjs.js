const path = require('path');

test('fake test', () => {
  expect(typeof test).toBe('function');
  expect(typeof path.join).toBe('function');
});
