import { inject, injectable } from 'inversify';
import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';
import { BaseRepository } from '../../repositories/implements/BaseRepository';
import { IBaseRepository } from '../../repositories/interfaces/IBaseRepository';
import { IBaseBL } from '../interfaces/IBaseBL';
import { TYPES } from '@/inversify/types';

@injectable()
export class BaseBL<T extends BaseModel> implements IBaseBL<T> {
  protected repository: IBaseRepository;

  constructor(@inject(TYPES.IBaseRepository)repository: IBaseRepository) {
    this.repository = repository;
  }

  public getAll() {
    const res = this.repository.getAll() as T[];
    return res;
  }
  public getById(id: string) {
    const res = this.repository.getById(id) as T;
    return res;
  }
  public getPaging() {
    const res = {} as PagingResponse<T>;
    return res;
  }

  public insertOne(model: T) {
    const res = this.repository.insertOne(model) as T;
    return res;
  }
  public updateOne(model: T): T {
    const res = this.repository.insertOne(model);
    return res as T;
  }
  public updateFields(fieldUpdates: FieldUpdate[]) {
    return true;
  }
  public updateField(fieldUpdate: FieldUpdate) {
    return true;
  }
}
