import 'reflect-metadata';
import { Container } from 'inversify';
import { BaseBL } from '../bl/implements/BaseBL';
import { IBaseBL } from '../bl/interfaces/IBaseBL';
import { BaseController } from '../controllers/base.controller';
import { IUserBL } from '@/bl/interfaces/IUserBL';
import { UserBL } from '@/bl/implements/UserBL';
import { UserController } from '@/controllers/user.controller';
import {TYPES} from './types';
import { IUserRepository } from '@/repositories/interfaces/IUserRepository';
import { UserRepository } from '@/repositories/implements/UserRepository';
import { IBaseRepository } from '@/repositories/interfaces/IBaseRepository';
import { BaseRepository } from '@/repositories/implements/BaseRepository';
const container = new Container();

//#region Repositories
container.bind<IBaseRepository>(TYPES.IBaseRepository).to(BaseRepository).inRequestScope();
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inRequestScope();
//#endregion

//#region Business Logic
container.bind<IBaseBL>(TYPES.IBaseBL).to(BaseBL).inRequestScope();
container.bind<IUserBL>(TYPES.IUserBL).to(UserBL).inRequestScope();
//#endregion

//#region Controllers
container.bind<BaseController>(TYPES.BaseController).to(BaseController).inTransientScope();
container.bind<UserController>(TYPES.UserController).to(UserController).inTransientScope(); // Ensure this line is present
//#endregion


export { container };