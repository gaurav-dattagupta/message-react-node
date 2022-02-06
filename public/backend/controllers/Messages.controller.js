"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var messages_1 = require("../models/messages");
var router = (0, express_1.Router)();
router.get('/:channelId', function (request, response) {
    var channelId = request.params['channelId'] || '';
    if (!channelId) {
        return response.status(414).send(new Error('Missing Mandatory Input')).end();
    }
    (0, messages_1.getMessages)(channelId)
        .then(function (messages) { return response.status(200).send(messages).end(); })
        .catch(function (_) { return response.status(500).send(new Error('Internal Server Error')).end(); });
});
exports.default = router;
