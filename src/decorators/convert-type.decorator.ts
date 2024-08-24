export function convertType<T>(type: T) {
  return function (target: Object, propertyName: string): void {
    Reflect.defineMetadata(propertyName, type, target);
  };
}
