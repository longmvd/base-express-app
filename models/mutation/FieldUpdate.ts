export class FieldUpdate {
  modelName: string;
  keyName: string;
  keyValue: string | number;
  fieldsAndValues: { [key: string]: number | string }[];
}
