"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const BaseModel_1 = require("./BaseModel");
class User extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.username = '';
        this.fullname = '';
        this.age = 0;
        this.gender = '';
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map