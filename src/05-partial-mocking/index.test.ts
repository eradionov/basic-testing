// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree } from './index';
const { unmockedFunction } = jest.requireActual('./index');

jest.mock('./index', () => {
  return {
    __esModule: true,
    mockOne: jest.fn(() => 'mockOne'),
    mockTwo: jest.fn(() => 'mockTwo'),
    mockThree: jest.fn(() => 'mockThree'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
  });

  test('unmockedFunction should log into console', () => {
    console.log = jest.fn();

    unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
