import { BaseModel } from './BaseModel';

export class User extends BaseModel {
  username: string;
  fullname: string;
  age: number;
  gender: string;
  email?: string;
}
