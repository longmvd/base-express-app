import { inject, injectable } from 'inversify';
import { User } from '../../models/User';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { IUserBL } from '../interfaces/IUserBL';
import { BaseBL } from './BaseBL';
import { TYPES } from '@/inversify/types';

@injectable()
export class UserBL extends BaseBL<User> implements IUserBL {
  constructor(@inject(TYPES.IUserRepository) repository: IUserRepository) {
    super(repository);
    console.log(repository);
  }
}
