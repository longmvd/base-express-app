export class BaseModel {
  id: string | number;
  createdBy?: string;
  createdDate?: Date;

  modifiedBy?: string;
  modifiedDate?: Date;
}
