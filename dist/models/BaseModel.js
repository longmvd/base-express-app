"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
class BaseModel {
    constructor() {
        this.id = '';
        this.createdBy = '';
        this.createdDate = new Date();
        this.modifiedBy = '';
        this.modifiedDate = new Date();
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map