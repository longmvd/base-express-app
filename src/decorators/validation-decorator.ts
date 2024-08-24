import { METADATA_DECORATOR_KEY } from './types';

interface Constructor {
  constructor: Function;
}

export const validationMetadata = new Map<string, any[]>();
interface CustomValidationRule {
  type: 'custom';
  validate: (value: any) => boolean;
  message: string;
}
export type validationRule =
  | 'required'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'phoneNumber'
  | {
      type: 'custom';
      validate: (value: any) => boolean;
      message?: string;
    };

export function isCustomRule(rule: validationRule): rule is {
  type: 'custom';
  validate: (value: any) => boolean;
  message: string;
} {
  return typeof rule === 'object' && 'type' in rule && rule.type === 'custom';
}

export function rules(validationRules: validationRule[]) {
  return function (target: Object, propertyKey: string) {
    Reflect.defineMetadata(
      METADATA_DECORATOR_KEY.RULES,
      validationRules,
      target,
      propertyKey
    );

    const className = target.constructor.name;
    if (!validationMetadata.has(className)) {
      validationMetadata.set(className, []);
    }
    validationMetadata.get(className)!.push({ propertyKey, validationRules });
  };
}

function getValidationRules(
  target: any,
  propertyKey: string
): validationRule[] | undefined {
  return Reflect.getMetadata(METADATA_DECORATOR_KEY.RULES, target, propertyKey);
}

// export function validate(obj: any): string[] {
//   const errors: string[] = [];
//   const className = obj.constructor.name;
//   const classMetadata = validationMetadata.get(className);
//   // const result = getValidationRules(User, 'username');
//   if (classMetadata) {
//     for (const { propertyKey, rules } of classMetadata) {
//       for (const rule of rules) {
//         const value = obj[propertyKey];
//         if (rule === 'required' && !value) {
//           errors.push(`${propertyKey} is required`);
//         } else if (rule === 'minLength' && value.length < 3) {
//           errors.push(`${propertyKey} must be at least 3 characters long`);
//         } else if (rule === 'maxLength' && value.length > 10) {
//           errors.push(`${propertyKey} must be at most 10 characters long`);
//         } else if (rule === 'phoneNumber' && !/^\d{10}$/.test(value)) {
//           errors.push(`${propertyKey} must be a valid phone number`);
//         } else if (typeof rule === 'object' && rule.type === 'custom') {
//           if (!rule.validate(value)) {
//             errors.push(rule.message);
//           }
//         }
//       }
//     }
//   }

//   return errors;
// }
