import path from 'path';

export const FOOBAR = 123;

export function barzzz(a: string, b: string) {
  return path.join('charlike', a, b);
}

export function add(foo: number, bar: number) {
  return 10 + foo + bar;
}
