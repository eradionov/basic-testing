// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest
      .fn()
      .mockResolvedValueOnce({ data: { message: 'Got Busted' } });
    const mockCreate = jest.spyOn(axios, 'create').mockReturnValueOnce({
      get: mockGet,
    } as unknown as AxiosInstance);

    await throttledGetDataFromApi('/test');

    jest.runAllTimers();

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest
      .fn()
      .mockResolvedValueOnce({ data: { message: 'Got Busted' } });
    jest.spyOn(axios, 'create').mockReturnValueOnce({
      get: mockGet,
    } as unknown as AxiosInstance);

    await throttledGetDataFromApi('/test');
    jest.runAllTimers();
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const mockedResponse = { message: 'Got Busted' };

    const mockGet = jest
      .fn()
      .mockResolvedValueOnce({ data: mockedResponse });
    jest.spyOn(axios, 'create').mockReturnValueOnce({
      get: mockGet,
    } as unknown as AxiosInstance);

    const result = await throttledGetDataFromApi('/test');
    jest.runAllTimers();

    expect(result).toEqual(mockedResponse);
  });
});
