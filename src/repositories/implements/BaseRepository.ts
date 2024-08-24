import { PrismaQuery } from '@/models/prisma-query';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';
import { IBaseRepository } from '../interfaces/IBaseRepository';

@injectable()
export class BaseRepository<T extends BaseModel = any>
  implements IBaseRepository<T>
{
  private db: PrismaClient;
  private typeName: string;
  private baseModels = [
    {
      id: 1,
      createdBy: 'me',
      createdDate: new Date(),
    },
    {
      id: 2,
      createdBy: 'me',
      createdDate: new Date(),
    },
    {
      id: 3,
      createdBy: 'me',
      createdDate: new Date(),
    },
  ] as T[];
  constructor() {
    this.db = new PrismaClient();
    this.typeName = this.constructor.name;
  }

  setTypeName(typeName: string) {
    this.typeName = typeName;
  }

  //#region GET Methods
  public async getAll(conditions?: PrismaQuery<T>) {
    const res = ((await this.db) as any)?.[this.typeName]?.findMany(
      conditions as any
    ) as any as T[];
    return res;
  }

  public async getById(id: string, select?: { [key in keyof T]: boolean }) {
    const res = ((await this.db) as any)?.[this.typeName]?.findUnique({
      where: {
        id: parseInt(id),
      },
      select: select,
    }) as any as T;
    return res ?? null;
  }
  public getPaging() {
    return {} as Promise<PagingResponse<T>>;
  }

  //#endregion

  public async insertOne(model: T) {
    if (model) {
      const ans = ((await this.db) as any)?.[this.typeName]?.create({
        data: model,
      }) as any as T;
      return ans;
    } else {
      return null;
    }
  }

  //#region UPDATE Methods

  public async updateOne(model: T) {
    if (model.id) {
      const modelUpdate = await this.getById(model.id.toString());
      if (modelUpdate) {
        for (let key in modelUpdate) {
          modelUpdate[key] = model[key];
        }
      }
      return modelUpdate;
    } else {
      return null;
    }
  }
  public updateFields(fieldUpdates: FieldUpdate[]) {
    return true;
  }
  public updateField(fieldUpdate: FieldUpdate) {
    return true;
  }
  //#endregion

  //#region DELETE Methods
  public deleteOne(id: string) {
    return true;
  }
  public deleteMany(ids: string[]) {
    return true;
  }

  //#endregion
}
