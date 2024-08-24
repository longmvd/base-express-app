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
  }

  //#region GET
  async get(request: Request, response: Response) {
    const res = await this.bl.getAll();
    response.json(res);
  }

  getById(request: Request, response: Response) {
    const res = this.bl.getById(request.params.id);
    response.json(res);
  }
  //#endregion
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
}
