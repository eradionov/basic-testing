// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: -2, action: Action.Add, expected: 1 },
  // Subtract
  { a: 3, b: -2, action: Action.Substract, expected: 5 },
  { a: -3, b: 2, action: Action.Substract, expected: -5 },
  { a: 0, b: 0, action: Action.Substract, expected: 0 },
  // Multiply
  { a: 3, b: -2, action: Action.Multiply, expected: -6 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  // Divide
  { a: 2, b: -2, action: Action.Divide, expected: -1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  // Exponentiate
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },
  // unknown
  { a: 3, b: 2, action: 'test', expected: null },
  { a: 'abc', b: 2, action: Action.Exponentiate, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test(`Testing ${a} ${action} ${b} = ${expected}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
