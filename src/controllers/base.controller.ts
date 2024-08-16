import { inject, injectable } from "inversify";
import { BaseBL } from "../bl/implements/BaseBL";
import { IBaseBL } from "../bl/interfaces/IBaseBL";
import { BaseModel } from "../models/BaseModel";
import { Router } from "express";
import { TYPES } from "@/inversify/types";
import { Request, Response } from "express";

@injectable()
export class BaseController {
  protected bl: IBaseBL;
  public router: Router;
  protected controllerName: string = '';
  constructor(
    @inject(TYPES.IBaseBL) bl: IBaseBL
  ) {
    this.bl = bl;
    this.router = Router();
    console.log(this.router);
    console.log(bl);
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
  get(request: Request, response: Response) {
    const res = this.bl.getAll();
    response.json(res);
  }

  getById(request: Request, response: Response) {
    const res = this.bl.getById(request.params.id);
    response.json(res);
  }
  //#endregion
  insert(request: Request, response: Response) {
    const res = this.bl.insertOne(request.body);
    response.json(res);
  }
}
