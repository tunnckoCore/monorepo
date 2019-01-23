import path from 'path';

export function barzzz(a: string, b: string) {
  return path.join('charlike', a, b);
}

export function add(foo: number, bar: number) {
  return 10 + foo + bar;
}

export function doh(foo: string) {
  return `${foo}-doh`;
}
