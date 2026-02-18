export function PerformanceTracker() {
  return function (
    target: any, //class prototype
    propertyKey: string,// method name 
    descriptor: PropertyDescriptor //method details 
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {

      const start = Date.now();

      const result = await originalMethod.apply(this, args);

      const end = Date.now();

      console.log(
        `${propertyKey} executed in ${end - start} ms`
      );

      return result;
    };

    return descriptor;
  };
}
