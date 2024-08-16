"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor() {
        this.baseModels = [
            {
                id: 1,
                createdBy: 'me',
                createdDate: new Date(),
            },
            {
                id: 2,
                createdBy: 'me',
                createdDate: new Date(),
            },
            {
                id: 3,
                createdBy: 'me',
                createdDate: new Date(),
            },
        ];
    }
    getAll() {
        const res = this.baseModels;
        return res;
    }
    getById(id) {
        const res = this.getAll().find((model) => model.id);
        return res !== null && res !== void 0 ? res : null;
    }
    insertOne(model) {
        if (model) {
            this.baseModels.push(model);
            return model;
        }
        else {
            return null;
        }
    }
    updateOne(model) {
        if (model.id) {
            const modelUpdate = this.getById(model.id.toString());
            if (modelUpdate) {
                for (let key in modelUpdate) {
                    modelUpdate[key] = model[key];
                }
            }
            return modelUpdate;
        }
        else {
            return null;
        }
    }
}
exports.BaseRepository = BaseRepository;
