import Redis from "ioredis";

export class CacheService {
  private redisClient: Redis.Redis

  constructor(host: string = process.env.REDIS_HOST, port: number = +process.env.REDIS_PORT) {
    this.redisClient = new Redis(port, host);
  }

  async set(key: string, value, ttl: number = null) {
    try {
      if (ttl) {
        return await this.redisClient.set(key, JSON.stringify(value), "EX", ttl)
      }
      return await this.redisClient.set(key, JSON.stringify(value))
    } catch (e) {
      console.log("Cache Service: set method", e);
    }
  }

  async get(key: string) {
    try {
      return await this.redisClient.get(key)
    } catch (e) {
      console.log("Cache Service: get method", e);
    }
  }

  async delete(key: string) {
    try {
      return await this.redisClient.del(key)
    } catch (e) {
      console.log("Cache Service: delete method", e);
    }
  }

  async exists(key: string) {
    try {
      return await this.redisClient.exists(key)
    } catch (e) {
      console.log("Cache Service: exists method", e);
    }
  }

}

