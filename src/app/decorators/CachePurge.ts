import { redisClient } from "../cache/redisClient";

export function CachePurge() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {

      const result = await originalMethod.apply(this, args);

      
      const possibleId = args[0];

      if (typeof possibleId === "string") {
        await redisClient.del(`document:${possibleId}`);
      }

      const searchKeys = await redisClient.keys("search:*");
      for (const key of searchKeys) {
        await redisClient.del(key);
      }

      console.log("Cache purged by decorator");

      return result;
    };

    return descriptor;
  };
}
