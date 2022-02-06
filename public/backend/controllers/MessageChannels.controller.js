"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var channels_1 = require("../models/channels");
var router = (0, express_1.Router)();
router.get('/', function (_, response) { return response.status(200).send(channels_1.MessageChannels).end(); });
exports.default = router;
