import { redisClient } from "../cache/redisClient";

export function CacheGet(ttl: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {

      let cacheKey = "";

      // getDocument(command)
      if (propertyKey === "getDocument") {
        const command = args[0];
        if (!command?.id) {
          throw new Error("Document id required for caching");
        }
        cacheKey = `document:${command.id}`;
      }

      // searchDocument(command)
      if (propertyKey === "searchDocument") {
        const command = args[0];
        cacheKey = `search:${command?.title ?? "all"}`;
      }

      if (!cacheKey) {
        return originalMethod.apply(this, args);
      }

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
