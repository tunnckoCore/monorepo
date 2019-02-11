import path from 'path';

export function join(a: string, b: string) {
  return path.join('charlike', a, b);
}

export function add(foo: number, bar: number) {
  return 10 + foo + bar;
}

export function qux(x: string, y: string) {
  return x + y;
}
