// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import fs from 'fs';
import * as fsPromises from 'fs/promises';
const path = jest.requireActual('path');
jest.mock('fs');
jest.mock('fs/promises');

const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
const mockFsPromises: jest.Mocked<typeof fsPromises> = <
  jest.Mocked<typeof fsPromises>
>fsPromises;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(() => 'got busted', 10);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 10);
    expect(callback).not.toBeCalled();

    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(() => 'got busted', 10);

    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 10);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 10);
    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinFn = jest.spyOn(path, 'join');

    await readFileAsynchronously('/path_ti_file');

    expect(joinFn).toBeCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    mockFS.existsSync.mockReturnValue(false);

    await expect(readFileAsynchronously('/path_ti_file')).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const content = 'This is string';
    mockFS.existsSync.mockReturnValue(true);
    mockFsPromises.readFile.mockReturnValue(Promise.resolve(content));

    await expect(readFileAsynchronously('/path_ti_file')).resolves.toBe(
      content,
    );
  });
});
