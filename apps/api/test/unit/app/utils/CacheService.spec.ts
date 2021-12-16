import CacheService from '../../../../src/app/utils/CacheService';
jest.mock('ioredis');

class FakeCacheService extends CacheService {
  public constructor(host = null, port = null) {
    super(host, port);
  }
  public getRedis() {
    return this.redisClient;
  }
}

describe("CacheService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  test("constructor()", () => {
    const cacheService = new FakeCacheService("testhost", 1);
    expect(cacheService.getRedis()).toBeTruthy();
  })

  describe("set()", () => {
    describe.each([
      {description:"no ttl", key: "key", value: {val: 1}, ttl: null, args: ["key", `{"val":1}`]},
      {description:"with ttl", key: "key", value: {val: 1}, ttl: 100, args: ["key", `{"val":1}`, "EX", 100]},
    ])("success", ({description, key, value, ttl, args}) => {
      test(`${description}`, async () => {
        const cacheService = new FakeCacheService();
        const spy = jest.spyOn(cacheService.getRedis(), "set");
        await cacheService.set(key, value, ttl);
        expect(spy).toBeCalledWith(...args);
      })
    })
    test("failure", async () => {
      const cacheService = new FakeCacheService();
      const spy = jest.spyOn(cacheService.getRedis(), "set").mockImplementation(async () => {
        throw Error("set error");
      });
      const res = await cacheService.set("test", {val: 1});
      expect(spy).toBeCalled();
      expect(res).toBe(undefined);
    })
  })

})
