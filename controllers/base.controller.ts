import { BaseBL } from '../bl/implements/BaseBL';
import { IBaseBL } from '../bl/interfaces/IBaseBL';
import { BaseModel } from '../models/BaseModel';
import { Router } from 'express';
export class BaseController {
  protected bl: IBaseBL;
  public router: Router;
  protected controllerName: string;
  constructor(bl: IBaseBL, controllerName: string) {
    this.bl = bl;
    this.router = Router();
    this.controllerName = controllerName;
    this.initializeDefaultRoutes();
  }

  initializeDefaultRoutes() {
    this.router.get(this.controllerName, this.get);
    this.router.get(`${this.controllerName}/:id`, (id: string) =>
      this.getByID(id)
    );
  }

  get() {
    return this.bl.getAll();
  }
  getByID(id: string) {
    return this.bl.getById(id);
  }
}
