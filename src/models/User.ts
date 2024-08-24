import { rules } from '@/decorators/validation-decorator';
import { BaseModel } from './BaseModel';

class Role extends BaseModel {
  constructor(model?: any) {
    super();
    this.name = '';
    this.description = '';
    this.initialize(model);
  }
  @rules(['required'])
  name: string;
  description: string;
}
class Group extends BaseModel {
  constructor(model?: any) {
    super();
    this.groupName = '';
    this.description = '';
    this.initialize(model);
  }
  @rules(['required'])
  groupName: string;
  description: string;
}

export class User extends BaseModel {
  constructor(model?: any) {
    super();
    this.username = '';
    this.fullName = '';
    this.age = 0;
    this.gender = '';
    this.email = '';
    this.password = '';
    // this.roles = [];
    // this.group = new Group({
    //   groupName: '',
    // });
    this.initialize(model);
  }
  @rules(['required'])
  username: string;
  fullName: string;
  age: number;
  gender?: string;

  @rules(['required', 'email'])
  email: string;

  @rules(['required'])
  password: string;

  // @convertType(Role)
  // roles: Role[];

  // @convertType(Group)
  // group?: Group;
}
