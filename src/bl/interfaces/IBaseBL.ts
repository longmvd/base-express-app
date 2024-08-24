import { NextFunction } from 'express';
import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';

export interface IBaseBL<T = BaseModel> {
  //#region get
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
  getPaging: () => Promise<PagingResponse<T>>;
  //#endregion

  //#region post
  insertOne(model: T, next?: NextFunction): Promise<T | null>;
  //#endregion

  //#region put
  updateOne(model: T): Promise<T | null>;
  //#endregion

  //#region patch
  updateFields: (fieldUpdates: FieldUpdate[]) => boolean;
  updateField: (fieldUpdate: FieldUpdate) => boolean;

  //#endregion

  //#region delete

  //#endregion
}
