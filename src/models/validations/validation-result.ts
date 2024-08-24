export interface ValidationResult {
  fieldName: string;
  message: string;
  validationType: ValidationType;
  recordId?: string;
  children?: ValidationResult[];
  errorCode?: number;
  index?: number;
}

export enum ValidationType {
  Required = 1,
  Unique = 2,
  MaxLength = 3,
  MinLength = 4,
  Email = 5,
  InValid = 6,
  Custom = 7,
}

export function createValidationResult(
  fieldName: string,
  message: string,
  validationType: ValidationType,
  index?: number,
  children?: ValidationResult[],
  recordId?: string,
  errorCode?: number
): ValidationResult {
  return {
    fieldName,
    message,
    validationType,
    recordId,
    children,
    errorCode,
    index,
  };
}
