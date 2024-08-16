import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';

export interface IBaseRepository<T = BaseModel> {
  //#region get
  getAll: () => T[];
  getById: (id: string) => T | null;
  getPaging: () => PagingResponse<T>;
  //#endregion

  //#region post
  insertOne(model: T): T | null;
  //#endregion

  //#region put
  updateOne(model: T): T | null;
  //#endregion

  //#region patch
  updateFields: (fieldUpdates: FieldUpdate[]) => boolean;
  updateField: (fieldUpdate: FieldUpdate) => boolean;

  //#endregion

  //#region delete

  //#endregion
}
