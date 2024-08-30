import { PrismaQuery } from '@/models/prisma-query';
import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';
import { PrismaClient } from '@prisma/client';

export interface IBaseRepository<T = BaseModel> {
  setTypeName(typeName: string): void;

  getDbInstance(): PrismaClient | any;


  //#region get
  getAll: (conditions?: PrismaQuery<T>) => Promise<T[]>;
  getById: (
    id: string,
    select?: { [key in keyof T]: boolean }
  ) => Promise<T | null>;
  getPaging: (conditions?: PrismaQuery<T>) => Promise<PagingResponse<T>>;
  //#endregion

  //#region post
  insertOne(model: T): Promise<T | null>;
  //#endregion

  //#region put
  updateOneById(model: T): Promise<T | null>;
  //#endregion

  //#region patch
  updateFields: (fieldUpdates: FieldUpdate[]) => Promise<T []>;
  updateField: (fieldUpdate: FieldUpdate) => Promise<T | null>;

  //#endregion

  //#region delete
  deleteOneById: (id: string) => Promise<boolean>;

  deleteManyById: (ids: string[]) => Promise<boolean>;

  //#endregion
}
