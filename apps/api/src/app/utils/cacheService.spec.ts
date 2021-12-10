import {CacheService} from "./cacheService";

describe('cache service', () => {
  it('should check if a key exists', async () => {
    const redis = new CacheService(process.env.REDIS_HOST_TEST);
    await redis.set("test", "test value");

    const exists = await redis.exists("test")
    expect(exists).toBe(1);

    const doesNotExists = await redis.exists("not")
    expect(doesNotExists).toBe(0);
  })

  it('should return the value for a key', async () => {
    const redis = new CacheService(process.env.REDIS_HOST_TEST);
    await redis.set("test", "test value");

    const value = await redis.get("test");
    expect(value).toEqual("\"test value\"");

    const doesNotExists = await redis.get("not");
    expect(doesNotExists).toEqual(null);
  })

  it('should delete the key', async () => {
    const redis = new CacheService(process.env.REDIS_HOST_TEST);
    await redis.set("test", "test value");

    const value = await redis.get("test");
    expect(value).toEqual("\"test value\"");

    await redis.delete("test")
    const find = await redis.get("test");
    expect(find).toBe(null);
  })
})
