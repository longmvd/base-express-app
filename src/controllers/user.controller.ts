import { inject, injectable } from 'inversify';
import { IUserBL } from '../bl/interfaces/IUserBL';
import { BaseController } from './base.controller';
import { TYPES } from '@/inversify/types';

@injectable()
export class UserController extends BaseController {
  constructor(@inject(TYPES.IUserBL) userBL: IUserBL) {
    super(userBL);
    this.controllerName = 'users';
    this.initializeRoutes();
  }

  override initControllerName(): string {
    this.controllerName = 'users';
    return this.controllerName;
  }

  initializeRoutes(){
    console.log('users initialized');
    // this.router.get(this.controllerName, (request, response) => this.getAll(request, response));
  }
  
}
