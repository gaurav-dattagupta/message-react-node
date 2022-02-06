'use strict';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.addNewMessage = void 0;
var utils_1 = require("../../common/utils");
var Messages = {};
var generateMessageData = function (id, msg) { return ({
    id: id,
    text: msg,
    created: new Date(),
    author: 'Root User',
    active: true,
}); };
function addNewMessage(channelId, message) {
    var channelMessages = Messages[channelId] || [];
    var newId = (0, utils_1.getNewId)(__spreadArray([], channelMessages, true));
    Messages[channelId] = channelMessages.concat([generateMessageData(newId, message)]);
    return Promise.resolve();
}
exports.addNewMessage = addNewMessage;
function getMessages(channelId) {
    var channelMessages = Messages[channelId] || [];
    return Promise.resolve(channelMessages.filter(function (msg) { return msg.active; }));
}
exports.getMessages = getMessages;
