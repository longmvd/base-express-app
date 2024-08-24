import { PrismaQuery } from '@/models/prisma-query';
import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';

export interface IBaseRepository<T = BaseModel> {
  setTypeName(typeName: string): void;
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
  updateOne(model: T): Promise<T | null>;
  //#endregion

  //#region patch
  updateFields: (fieldUpdates: FieldUpdate[]) => boolean;
  updateField: (fieldUpdate: FieldUpdate) => boolean;

  //#endregion

  //#region delete
  deleteOne: (id: string) => boolean;

  deleteMany: (ids: string[]) => boolean;

  //#endregion
}
