// // import React from 'react';
// import test from 'ava';
import { join, add } from '..';

// test('join paths', (t) => {
//   t.is(join('abc', 'qux'), 'charlike/abc/qux');
// });

// test('add numbers', (t) => {
//   // const foo = <div>foobar</div>;
//   t.is(add(20, 30), 60);
// });

// // test('sasasa', (t) => {
// //   t.is(1, 2);
// // });

test('join paths', () => {
  expect(join('abc', 'qux')).toStrictEqual('charlike/abc/qux');
});

test('add numbers', () => {
  // const foo = <div>foobar</div>;
  expect(add(20, 30)).toStrictEqual(60);
});
