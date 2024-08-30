import { NextFunction } from 'express';
import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';

export interface IBaseBL<T = BaseModel> {
  //#region get
  getAll: () => Promise<T[]>;
  getById: (id: string, next?: NextFunction) => Promise<T | null>;
  getPaging: () => Promise<PagingResponse<T>>;
  //#endregion

  //#region post
  insertOne(model: T, next?: NextFunction): Promise<T | null>;
  //#endregion

  //#region put
  updateOneById(model: T, next?: NextFunction): Promise<T | null>;
  //#endregion

  //#region patch
  updateFields: (fieldUpdates: FieldUpdate[]) => Promise<T[] | null>;
  updateField: (fieldUpdate: FieldUpdate) => Promise<T | null>;

  //#endregion

  //#region delete
  deleteOneById: (id: string) => Promise<boolean>;

  deleteManyById: (ids: string[]) => Promise<boolean>;

  //#endregion
}
