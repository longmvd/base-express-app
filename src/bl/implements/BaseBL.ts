import { validate } from '@/decorators/validate';
import { TYPES } from '@/inversify/types';
import { ServiceResponseError } from '@/models/service-reponse/service-response';
import { ValidationResult } from '@/models/validations/validation-result';
import { Constructable } from '@/types/base-types';
import { convertObject } from '@/utils/convert.utils';
import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseModel } from '../../models/BaseModel';
import { FieldUpdate } from '../../models/mutation/FieldUpdate';
import { PagingResponse } from '../../models/pagination/paging-response';
import { IBaseRepository } from '../../repositories/interfaces/IBaseRepository';
import { IBaseBL } from '../interfaces/IBaseBL';

@injectable()
export class BaseBL<T extends BaseModel> implements IBaseBL<T> {
  protected repository: IBaseRepository;
  protected type: Constructable<T>;

  constructor(@inject(TYPES.IBaseRepository) repository: IBaseRepository) {
    this.repository = repository;
    this.type = BaseModel as any;
  }
  //#region GET Methods

  public async getAll() {
    const res = (await this.repository.getAll()) as T[];
    return res;
  }
  public async getById(id: string) {
    const res = (await this.repository.getById(id)) as T;
    return res;
  }
  public async getPaging() {
    const res = {} as PagingResponse<T>;
    return res;
  }
  //#endregion

  //#region INSERT Methods
  public async insertOne(model: T, next?: NextFunction) {
    const validationResults = this.validateBeforeInsert(model);
    if (validationResults.length == 0) {
      model.createdBy = 'admin';
      const res = (await this.repository.insertOne(model)) as T;
      return res;
    }
    if (next) {
      next(new ServiceResponseError(400, 'Invalid model', validationResults));
    }
    return null;
  }

  //#endregion

  //#region UPDATE Methods
  public async updateOne(model: T) {
    model.createdBy = 'admin';
    const res = await this.repository.insertOne(model);
    return res as T;
  }
  public updateFields(fieldUpdates: FieldUpdate[]) {
    return true;
  }
  public updateField(fieldUpdate: FieldUpdate) {
    return true;
  }

  //#endregion

  //#region Validation Methods
  protected validateBeforeInsert(model: T): ValidationResult[] {
    const modelConverted = convertObject<T>(this.type, model);
    // const x = validate(modelConverted, this.type);
    const validationResults: ValidationResult[] = validate(
      modelConverted,
      this.type
    );
    return validationResults;
  }
  //#endregion
}
