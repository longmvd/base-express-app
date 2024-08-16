import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';
import { IBaseRepository } from '../interfaces/IBaseRepository';

export class BaseRepository<T extends BaseModel> implements IBaseRepository<T> {
  private baseModels: BaseModel[] = [
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
  ];
  constructor() {}

  public getAll() {
    const res = this.baseModels as T[];
    return res;
  }
  public getById(id: string) {
    const res = this.getAll().find((model) => model.id);
    return res ?? null;
  }
  public getPaging: () => PagingResponse<T>;

  public insertOne(model: T): T {
    if (model) {
      this.baseModels.push(model);
      return model;
    } else {
      return null;
    }
  }
  public updateOne(model: T) {
    if (model.id) {
      const modelUpdate = this.getById(model.id.toString());
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
  public updateFields: (fieldUpdates: FieldUpdate[]) => boolean;
  public updateField: (fieldUpdate: FieldUpdate) => boolean;
}
