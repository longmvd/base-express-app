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
  protected type: Constructable<T>;
  protected repository: IBaseRepository;

  constructor(@inject(TYPES.IBaseRepository) repository: IBaseRepository) {
    this.repository = repository;
    this.type = BaseModel as any;
  }
  //#region GET Methods

  public async getAll() {
    const res = (await this.repository.getAll()) as T[];
    return res;
  }
  public async getById(id: string, next?: NextFunction) {
    try{
      const res = (await this.repository.getById(id)) as T;
      if(!res && next) {
        next(new ServiceResponseError(404, 'Model not found'));
      }
      return res;
    }catch(e: any) {
      if(next) {
        next(new ServiceResponseError(500, e.message, e));
      }
      return null;
    }
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
      await this.beforeInsert(model);
      const res = (await this.repository.insertOne(model)) as T;
      await this.afterInsert(res);
      return res;
    }
    if (next) {
      next(new ServiceResponseError(400, 'Invalid model', validationResults));
    }
    return null;
  }

  //#endregion

  //#region UPDATE Methods
  public async updateOneById(model: T, next?: NextFunction) {
    const validationResults = this.validateBeforeUpdate(model);
    if(validationResults.length > 0) {
      if(next) {
        next(new ServiceResponseError(400, 'Invalid model', validationResults));
      }
      return null;
    }
    await this.beforeUpdate(model);
    const res = await this.repository.updateOneById(model);
    if(!res) {
      if(next) {
        next(new ServiceResponseError(404, 'Model not found'));
      }
      return null;
    }
    await this.afterUpdate(model);
    return res as T;
  }

  public async updateFields(fieldUpdates: FieldUpdate[], next?: NextFunction) {
    const validationResults = this.validateBeforeUpdateFields(fieldUpdates);
    if(validationResults.length > 0) {
      if(next) {
        next(new ServiceResponseError(400, 'Invalid model', validationResults));
      }
      return null;
    }
    const res = await this.repository.updateFields(fieldUpdates);
    return res as T[];
  }

  public async updateField(fieldUpdate: FieldUpdate, next?: NextFunction) {
    const validationResults = this.validateBeforeUpdateField(fieldUpdate);
    if(validationResults.length > 0) {
      if(next) {
        next(new ServiceResponseError(400, 'Invalid model', validationResults));
      }
      return null;
    }
    const res = await this.repository.updateField(fieldUpdate);
    return res as T;
  }

  //#endregion

  //#region DELETE Methods
  public async deleteOneById(id: string) {
    const res = await this.repository.deleteOneById(id);
    return res;
  }
  public async deleteManyById(ids: string[]) {
    const res = await this.repository.deleteManyById(ids);
    return res;
  }

  /**
   * Handles the logic before updating a model
   * @param model 
   */
  async beforeUpdate(model: T) {
    //TODO: Implement before update
  }

  /**
   * Handles the logic after updating a model
   * @param model 
   */
  async afterUpdate(model: T) {
    //TODO: Implement after update
  }

  /**
   * Handles the logic before inserting a model
   * @param model 
   */
  async beforeInsert(model: T) {}
  
  /**
   * Handles the logic after inserting a model
   * @param model 
   */
  async afterInsert(model: T) {}
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
  protected validateBeforeUpdate(model: T): ValidationResult[] {
    const modelConverted = convertObject<T>(this.type, model);
    // const x = validate(modelConverted, this.type);
    //TODO: Implement validation for update
    const validationResults: ValidationResult[] = []
    return validationResults;
  }

  protected validateBeforeUpdateFields(fieldUpdates: FieldUpdate[]): ValidationResult[] {
    const validationResults: ValidationResult[] = []
    //TODO: Implement validation for field updates
    return validationResults;
  }

  protected validateBeforeUpdateField(fieldUpdate: FieldUpdate): ValidationResult[] {
    const validationResults: ValidationResult[] = []
    //TODO: Implement validation for field update
    return validationResults;
  }
  
  //#endregion
}
