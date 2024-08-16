"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBL = void 0;
const BaseRepository_1 = require("../../repositories/implements/BaseRepository");
class BaseBL {
    constructor(repository) {
        this.repository = repository !== null && repository !== void 0 ? repository : new BaseRepository_1.BaseRepository();
    }
    getAll() {
        const res = this.repository.getAll();
        return res;
    }
    getById(id) {
        const res = this.repository.getById(id);
        return res;
    }
    getPaging() {
        const res = {};
        return res;
    }
    insertOne(model) {
        const res = this.repository.insertOne(model);
        return res;
    }
    updateOne(model) {
        const res = this.repository.insertOne(model);
        return res;
    }
    updateFields(fieldUpdates) {
        return true;
    }
    updateField(fieldUpdate) {
        return true;
    }
}
exports.BaseBL = BaseBL;
