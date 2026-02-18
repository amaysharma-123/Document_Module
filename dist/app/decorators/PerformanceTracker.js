"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceTracker = PerformanceTracker;
function PerformanceTracker() {
    return function (target, //class prototype
    propertyKey, // method name 
    descriptor //method details 
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const start = Date.now();
            const result = await originalMethod.apply(this, args);
            const end = Date.now();
            console.log(`${propertyKey} executed in ${end - start} ms`);
            return result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=PerformanceTracker.js.map