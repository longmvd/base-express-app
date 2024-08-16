"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const inversify_1 = require("inversify");
let BaseRepository = class BaseRepository {
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
        const res = this.getAll().find((model) => model.id === parseInt(id));
        return res !== null && res !== void 0 ? res : null;
    }
    getPaging() {
        return {};
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
    updateFields(fieldUpdates) {
        return true;
    }
    ;
    updateField(fieldUpdate) {
        return true;
    }
    ;
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], BaseRepository);
//# sourceMappingURL=BaseRepository.js.map