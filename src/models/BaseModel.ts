export class BaseModel {
  constructor(model?: Partial<BaseModel>) {
    this.id = '';
    this.createdBy = '';
    this.createdDate = new Date();
    this.modifiedBy = '';
    this.modifiedDate = new Date();
    if (model) {
      Object.assign(this, model);
    }
  }
  id: string | number;
  createdBy?: string;
  createdDate?: Date;

  modifiedBy?: string;
  modifiedDate?: Date;

  initialize(data: any) {
    if (data) {
      // for (let key in this) {
      //   if (data.hasOwnProperty(key)) {
      //     this[key] = data[key];
      //   }
      // }
      if (data) {
        Object.assign(this, data);
      }
    }
  }
}
