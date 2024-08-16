import { User } from '../../models/User';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { IUserBL } from '../interfaces/IUserBL';
import { BaseBL } from './BaseBL';

export class UserBL extends BaseBL<User> implements IUserBL {
  constructor(repository: IUserRepository) {
    super(repository);
  }
}
