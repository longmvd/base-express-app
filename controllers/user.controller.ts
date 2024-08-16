import { IUserBL } from '../bl/interfaces/IUserBL';
import { BaseController } from './base.controller';

class UserController extends BaseController {
  constructor(userBL: IUserBL) {
    super(userBL, 'users');
  }
  initializeRoutes(){
    this.router.get(this.controllerName, )
  }
  getAll
}
