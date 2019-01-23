import path from 'path';

export function bar(a: string, b: string) {
  return path.join('charlike', a, b);
}

export function add(foo: number, bar: number) {
  return 10 + foo + bar;
}
