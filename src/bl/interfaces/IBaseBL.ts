import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';

export interface IBaseBL<T = BaseModel> {
  //#region get
  getAll: () => T[];
  getById: (id: string) => T;
  getPaging: () => PagingResponse<T>;
  //#endregion

  //#region post
  insertOne(model: T): T;
  //#endregion

  //#region put
  updateOne(model: T): T;
  //#endregion

  //#region patch
  updateFields: (fieldUpdates: FieldUpdate[]) => boolean;
  updateField: (fieldUpdate: FieldUpdate) => boolean;

  //#endregion

  //#region delete

  //#endregion
}
