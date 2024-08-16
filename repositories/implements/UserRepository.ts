import { User } from '../../models/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { BaseRepository } from './BaseRepository';

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository {}
