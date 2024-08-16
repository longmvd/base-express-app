import { BaseModel } from './BaseModel';

export class User extends BaseModel {
  constructor() {
    super();
    this.username = '';
    this.fullname = '';
    this.age = 0;
    this.gender = '';
  }
  username: string;
  fullname: string;
  age: number;
  gender: string;
  email?: string;
}
