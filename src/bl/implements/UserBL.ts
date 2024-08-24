import { TYPES } from '@/inversify/types';
import { IBaseRepository } from '@/repositories/interfaces/IBaseRepository';
import { inject, injectable } from 'inversify';
import { User } from '../../models/User';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { IUserBL } from '../interfaces/IUserBL';
import { BaseBL } from './BaseBL';

@injectable()
export class UserBL extends BaseBL<User> implements IUserBL {
  constructor(
    @inject<IUserRepository>(TYPES.IUserRepository) repository: IBaseRepository
  ) {
    super(repository);
    this.repository.setTypeName('user');
    this.type = User;
    console.log(repository);
  }
}
