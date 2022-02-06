"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = require("./router");
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', router_1.router);
var port = 3002;
app.listen(process.env['PORT'] || 3002, function () { return console.log("message-app-api server started at http://localhost:" + port); });
