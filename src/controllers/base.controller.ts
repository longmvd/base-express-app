import { TYPES } from '@/inversify/types';
import { ServiceResponseError } from '@/models/service-reponse/service-response';
import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IBaseBL } from '../bl/interfaces/IBaseBL';

@injectable()
export class BaseController {
  protected bl: IBaseBL;
  public router: Router;
  protected controllerName: string = '';
  constructor(@inject(TYPES.IBaseBL) bl: IBaseBL) {
    this.bl = bl;
    this.router = Router();
    this.initControllerName();
    this.initializeDefaultRoutes();
  }

  setControllerName(controllerName: string) {
    this.controllerName = controllerName;
  }

  initControllerName() {
    this.controllerName = 'bases';
    return this.controllerName;
  }

  initializeDefaultRoutes() {
    this.router.get(`/${this.controllerName}`, this.get.bind(this));
    this.router.get(`/${this.controllerName}/:id`, this.getById.bind(this));
    this.router.post(`/${this.controllerName}`, this.insert.bind(this));
    this.router.put(`/${this.controllerName}/:id`, this.update.bind(this));
    this.router.delete(`/${this.controllerName}/:id`, this.delete.bind(this));
  }

  //#region GET
  async get(request: Request, response: Response) {
    const res = await this.bl.getAll();
    response.json(res);
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const res = await this.bl.getById(request.params.id, next);
    if (res) {
      response.json(res);
    }
  }
  //#endregion

  //#region POST
  async insert(request: Request, response: Response, next: NextFunction) {
    try {
      const res = await this.bl.insertOne(request.body, next);
      if (res) {
        response.json(res);
      }
    } catch (e: any) {
      next(new ServiceResponseError(400, e.message, e));
    }
  }
  //#endregion

  //#region PUT
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const model = request.body;
      model.id = request.params.id;
      const res = await this.bl.updateOneById(request.body, next);
      if (res) {
        response.json(res);
      }
    }catch (e: any) {
      next(new ServiceResponseError(400, e.message, e));
    }
  }
  //#endregion

  //#region DELETE
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const res = await this.bl.deleteOneById(request.params.id);
      if (res) {
        response.json(res);
      }
    } catch (e: any) {
      next(new ServiceResponseError(400, e.message, e));
    }
  }

  async deleteMany(request: Request, response: Response, next: NextFunction) {
    try {
      const res = await this.bl.deleteManyById(request.body.ids);
      if (res) {
        response.json(res);
      }
    } catch (e: any) {
      next(new ServiceResponseError(400, e.message, e));
    }
  }
  //#endregion
}
