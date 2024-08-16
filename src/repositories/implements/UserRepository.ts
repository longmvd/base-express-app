import { injectable } from 'inversify';
import { User } from '../../models/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { BaseRepository } from './BaseRepository';

@injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository {}
