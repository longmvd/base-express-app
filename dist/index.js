"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const app_1 = __importDefault(require("./app"));
const inversify_config_1 = require("./inversify/inversify.config");
const types_1 = require("./inversify/types");
const PORT = process.env.PORT || 3000;
const app = new app_1.default([inversify_config_1.container.get(types_1.TYPES.UserController)], PORT);
app.listen();
//# sourceMappingURL=index.js.map