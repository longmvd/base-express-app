"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base.controller");
class UserController extends base_controller_1.BaseController {
    constructor(userBL) {
        super(userBL, 'users');
    }
    initializeRoutes() {
        this.router.get(this.controllerName);
    }
}
