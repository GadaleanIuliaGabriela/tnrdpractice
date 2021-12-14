import IORedis from 'ioredis';
import CacheService from './cacheService';

jest.mock('ioredis');

const IORedisMock = IORedis as jest.MockedClass<typeof IORedis>;

describe("Testing Cache Service", () => {
  beforeEach(() => {
    IORedisMock.mockClear();
  });

  test('Check if the cache service called the redis constructor', () => {
    const cacheService = new CacheService();
    expect(IORedisMock).toHaveBeenCalledTimes(1);
  });

  test('Check set method', async () => {
    const cacheService = new CacheService();
    expect(IORedisMock).toHaveBeenCalledTimes(1);

    await cacheService.set("key", "test");
    expect(IORedisMock.prototype.set.mock.calls[0][0]).toEqual("key");
  });

  test('Check get method', async () => {
    const cacheService = new CacheService();
    expect(IORedisMock).toHaveBeenCalledTimes(1);

    jest.spyOn(IORedisMock.prototype, "get").mockImplementation(() => "test");
    const cachedValue = await cacheService.get("key")
    expect(IORedisMock.prototype.get.mock.calls[0][0]).toEqual("key");
    expect(cachedValue).toBe("test");
  });

  test('Check exist method', async () => {
    const cacheService = new CacheService();
    expect(IORedisMock).toHaveBeenCalledTimes(1);

    jest.spyOn(IORedisMock.prototype, "exists").mockImplementation(() => true);
    const cachedValueExists = await cacheService.exists("key")
    expect(IORedisMock.prototype.exists.mock.calls[0][0]).toEqual("key");
    expect(cachedValueExists).toBeTruthy();
  });

  test('Check delete method', async () => {
    const cacheService = new CacheService();
    expect(IORedisMock).toHaveBeenCalledTimes(1);

    jest.spyOn(IORedisMock.prototype, "del").mockImplementation(() => true);
    const deletedCached = await cacheService.delete("key")
    expect(IORedisMock.prototype.del.mock.calls[0][0]).toEqual("key");
    expect(deletedCached).toBeTruthy();
  });

})
