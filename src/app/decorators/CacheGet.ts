import { log } from "console";
import { redisClient } from "../cache/redisClient";

export function CacheGet(prefix: string, margs: string[], ttl: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const command = args[0];

      let cacheKeySegments = [prefix];

      margs.forEach((value) => {
        cacheKeySegments.push(command[value]);
      });

      const cacheKey = cacheKeySegments.join(":");
      console.log("cache something", cacheKey);
      const cached = await redisClient.get(cacheKey);

      if (cached) {
        console.log("CACHE HIT:", cacheKey);
        return JSON.parse(cached);
      }

      console.log("CACHE MISS:", cacheKey);

      const result = await originalMethod.apply(this, args);

      if (result !== null && result !== undefined) {
        await redisClient.set(cacheKey, JSON.stringify(result), {
          expiration: {
            type: "EX",
            value: ttl,
          },
        });
      }
      return result;
    };

    return descriptor;
  };
}

