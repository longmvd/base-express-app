import { Constructable } from '@/types/base-types';
import 'reflect-metadata';
export function convertToSnakeCase(text: string): string {
  return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function convertObject<T extends Object>(
  outputType: Constructable<T>,
  input: any
) {
  if (input) {
    const output = new outputType() as any;

    const convertProperties = Reflect.getMetadataKeys(output);

    for (const key of Object.keys(input)) {
      if (convertProperties.includes(key)) {
        if (Array.isArray(input[key])) {
          output[key] = convertList(
            Reflect.getMetadata(key, output),
            input[key]
          );
        } else {
          output[key] = convertObject(
            Reflect.getMetadata(key, output),
            input[key]
          );
        }
      } else {
        output[key] = input[key];
      }
    }
    return output as T;
  }
}

function convertList(type: any, list: any[]): any[] {
  return list.map((item) => convertObject(type, item));
}
