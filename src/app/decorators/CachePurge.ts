import { redisClient } from "../cache/redisClient";

export function CachePurge(prefix:string, margs:string[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {

      const result = await originalMethod.apply(this, args);
      const command = args[0];
   
      let cacheKeySegments  = [prefix];
      
      margs.forEach(value=>{
        cacheKeySegments.push(command[value]);
      });

      const cacheKey=cacheKeySegments.join(':');
      await redisClient.del(cacheKey);

      console.log("Cache purged by decorator",cacheKey);

      return result;
    };

    return descriptor;
  };
}
