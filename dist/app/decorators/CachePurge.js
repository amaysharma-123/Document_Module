"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachePurge = CachePurge;
const redisClient_1 = require("../cache/redisClient");
function CachePurge() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const result = await originalMethod.apply(this, args);
            const possibleId = args[0];
            if (typeof possibleId === "string") {
                await redisClient_1.redisClient.del(`document:${possibleId}`);
            }
            const searchKeys = await redisClient_1.redisClient.keys("search:*");
            for (const key of searchKeys) {
                await redisClient_1.redisClient.del(key);
            }
            console.log("Cache purged by decorator");
            return result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=CachePurge.js.map