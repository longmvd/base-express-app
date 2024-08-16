"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const express_1 = require("express");
class BaseController {
    constructor(bl, controllerName) {
        this.bl = bl;
        this.router = (0, express_1.Router)();
        this.controllerName = controllerName;
        this.initializeDefaultRoutes();
    }
    initializeDefaultRoutes() {
        this.router.get(this.controllerName, this.get);
        this.router.get(`${this.controllerName}/:id`, (id) => this.getByID(id));
    }
    get() {
        return this.bl.getAll();
    }
    getByID(id) {
        return this.bl.getById(id);
    }
}
exports.BaseController = BaseController;
