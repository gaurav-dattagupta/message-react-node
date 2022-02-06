"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var MessageChannels_controller_1 = __importDefault(require("./controllers/MessageChannels.controller"));
var Messages_controller_1 = __importDefault(require("./controllers/Messages.controller"));
var messages_1 = require("./models/messages");
exports.router = (0, express_1.Router)();
exports.router.use('/channels', MessageChannels_controller_1.default);
exports.router.use('/messages', Messages_controller_1.default);
exports.router.post('/:channelId', function (request, response) {
    var channelId = request.params['channelId'] || '';
    var message = request.body.message;
    if (!channelId || typeof message == undefined) {
        return response.status(415).send(new Error('Missing mandatory input'));
    }
    return (0, messages_1.addNewMessage)(channelId, message)
        .then(function () { return response.status(200).send({}).end(); })
        .catch(function (_) { return response.status(500).send(new Error('Internal Server Error')).end(); });
});
