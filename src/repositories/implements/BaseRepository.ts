import { PrismaQuery } from '@/models/prisma-query';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import { User } from '@/models/User';

@injectable()
export class BaseRepository<T extends BaseModel = any>
  implements IBaseRepository<T>
{
  private db: PrismaClient;
  private typeName: string;
  
  constructor() {
    this.db = new PrismaClient();
    this.typeName = this.constructor.name;
  }

  setTypeName(typeName: string) {
    this.typeName = typeName;
  }

  getDbInstance(): PrismaClient | any {
    return this.db;
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

  public async updateOneById(model: T) {
    if (model.id) {
      const id = model.id;
      const numberId = Number(id);
      model.id = undefined;
      const modelUpdate = ((await this.db) as any)?.[this.typeName]?.update({
        where: {
          id: isNaN(numberId) ? id.toString() : numberId,
        },
        data: model,
      })
      
      return modelUpdate;
    } else {
      return null;
    }
  }
  public async updateFields(fieldUpdates: FieldUpdate[]) {
    const promises = [];
    for(const fieldUpdate of fieldUpdates){
      const data = fieldUpdate.fieldsAndValues;
      const select: any = {};
      const where: any = {};
      where[fieldUpdate.keyName] = fieldUpdate.keyValue;
      for(const field in data){
        if(data[field]){
          select[field] = true;
        }
      }
      const promise = (this.db as any)?.[this.typeName]?.update({
        where:where,
        select:select,
        data: data,
      })
      if(promise){
        promises.push(promise);
      }
    }
    
    const result = await Promise.all(promises) as any
    return result;
  }
  public async updateField(fieldUpdate: FieldUpdate) {
    const res = await this.updateFields([fieldUpdate]);
    return res[0];
  }
  //#endregion

  //#region DELETE Methods
  public async deleteOneById(id: string) {
    // const res = ((await this.db) as any)?.[this.typeName]?.delete()
    const numberId = Number(id);
    const res = await this.db.user.delete({
      where: {
        id: isNaN(numberId) ? id?.toString() as any : numberId,
      }
    })
    if(res){
      return true;
    }
    return false;
  }

  public async deleteManyById(ids: string[]) {
    const res = await this.db.user.deleteMany({
      where: {
        id: {
          in: ids as any,
        }
      }
    })
    if(res){
      return true;
    }
    return false;
  }

  //#endregion
}
