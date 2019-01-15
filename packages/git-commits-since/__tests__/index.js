import index from '../src/index';
test('foo bar baz', () => {
  // expect(path.join('aa', 'bb')).toBe('aa/bb');
  expect(index).toBeTruthy();
});
