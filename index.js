"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('<h1>Nhiệt liệt chào mừng quý vị đại coder!</h1>');
});
app.listen(PORT, function () { return console.log("Running on ".concat(PORT, " \u26A1")); });
