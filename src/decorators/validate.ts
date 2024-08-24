import {
  createValidationResult,
  ValidationResult,
  ValidationType,
} from '@/models/validations/validation-result';
import { Constructable } from '@/types/base-types';
import { METADATA_DECORATOR_KEY } from './types';
import { isCustomRule, validationRule } from './validation-decorator';

function getValidationRules(
  target: any,
  propertyKey: string
): validationRule[] | undefined {
  return Reflect.getMetadata(METADATA_DECORATOR_KEY.RULES, target, propertyKey);
}

export function validate<T>(
  obj: any,
  type: Constructable<T>,
  objIndex?: number
): ValidationResult[] {
  const errors: ValidationResult[] = [];
  const errorsMap = new Map<string, ValidationResult>();
  const propertyKeys = Object.getOwnPropertyNames(obj);

  for (const propertyKey of propertyKeys) {
    const rules = getValidationRules(type.prototype, propertyKey);
    const value = obj[propertyKey];
    if (rules) {
      for (const rule of rules) {
        if (rule === 'required' && !value) {
          const error = createValidationResult(
            propertyKey,
            `${propertyKey} is required`,
            ValidationType.Required,
            objIndex
          );
          errorsMap.set(propertyKey, error);
          errors.push(error);
        } else if (rule === 'minLength' && value.length < rule.length) {
          const error = createValidationResult(
            propertyKey,
            `${propertyKey} must be at least ${rule.length} characters long`,
            ValidationType.MinLength,
            objIndex
          );
          errorsMap.set(propertyKey, error);
          errors.push(error);
        } else if (rule === 'maxLength' && value.length > rule.length) {
          const error = createValidationResult(
            propertyKey,
            `${propertyKey} must be at most ${rule.length} characters long`,
            ValidationType.MaxLength,
            objIndex
          );
          errorsMap.set(propertyKey, error);
          errors.push(error);
        } else if (
          rule === 'phoneNumber' &&
          !validateByRegex(value, phoneNumberRegex)
        ) {
          const error = createValidationResult(
            propertyKey,
            `${propertyKey} must be phone number`,
            ValidationType.Required,
            objIndex
          );
          errorsMap.set(propertyKey, error);
          errors.push(error);
        } else if (rule === 'email' && !validateByRegex(value, emailRegex)) {
          const error = createValidationResult(
            propertyKey,
            `${propertyKey} field must be email`,
            ValidationType.Required,
            objIndex
          );
          errorsMap.set(propertyKey, error);
          errors.push(error);
        } else if (isCustomRule(rule)) {
          if (typeof rule.validate === 'function' && !rule.validate(value)) {
            const error = createValidationResult(
              propertyKey,
              rule.message || 'Invalid value',
              ValidationType.Custom,
              objIndex
            );
            errorsMap.set(propertyKey, error);
            errors.push(error);
          }
        }
      }
    }
    // Check if the property is an object and not null
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        // Iterate through the array and validate each element
        let index = 0;
        for (const item of value) {
          if (typeof item === 'object') {
            const nestedType = Reflect.getMetadata(propertyKey, type.prototype);
            if (nestedType) {
              const nestedErrors = validate(item, nestedType, index);
              let nestedError = createValidationResult(
                propertyKey,
                `${propertyKey} is invalid`,
                ValidationType.InValid,
                objIndex
              );
              if (errorsMap.has(propertyKey)) {
                const error = errorsMap.get(propertyKey);
                if (error?.children) {
                  error.children.push(...nestedErrors);
                } else {
                  error!.children = nestedErrors;
                }
              } else {
                nestedError.children = nestedErrors;
                errorsMap.set(propertyKey, nestedError);
                errors.push(nestedError);
              }
            }
          }
          index++;
        }
      } else {
        // Determine the type of the nested object
        const nestedType = Reflect.getMetadata(
          'design:type',
          type.prototype,
          propertyKey
        );
        if (nestedType) {
          // Recursively validate the nested object
          const nestedErrors = validate(value, nestedType);
          errors.push(...nestedErrors);
        }
      }
    }
  }

  return errors;
}
const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateByRegex(value: string, regex: string | RegExp): boolean {
  return new RegExp(regex).test(value);
}
