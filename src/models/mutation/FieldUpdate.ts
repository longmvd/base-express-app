export class FieldUpdate {

  constructor(modelName: string, keyName: string, keyValue: string | number, fieldsAndValues: { [key: string]: number | string }[]) {
    this.modelName = '';
    this.keyName = '';
    this.keyValue = '';
    this.fieldsAndValues = [];
  }

  modelName: string;
  keyName: string;
  keyValue: string | number;
  fieldsAndValues: { [key: string]: number | string }[];
}
