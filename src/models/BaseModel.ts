export class BaseModel {
  constructor() {
    this.id = '';
    this.createdBy = '';
    this.createdDate = new Date();
    this.modifiedBy = '';
    this.modifiedDate = new Date();
  }
  id: string | number;
  createdBy?: string;
  createdDate?: Date;

  modifiedBy?: string;
  modifiedDate?: Date;
}
