"use strict";
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
exports.setLocalMessages = exports.getLocalMessages = exports.getMessageDateTime = exports.getNewId = exports.usePrevious = void 0;
var react_1 = require("react");
var usePrevious = function (value) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        ref.current = value;
    });
    return ref.current;
};
exports.usePrevious = usePrevious;
var getNewId = function (allMessages) {
    if (allMessages === void 0) { allMessages = []; }
    return ((allMessages.pop() || {}).id || 0) + 1;
};
exports.getNewId = getNewId;
var getNewFraction = function (numerator, denominator) {
    if (denominator === void 0) { denominator = 1; }
    return Math.floor(numerator / denominator);
};
var isWithinTimeSegment = function (fraction, segmentLimit) {
    if (segmentLimit === void 0) { segmentLimit = 1; }
    return fraction < segmentLimit;
};
var getTimeMessage = function (timeDiff, timeBreaks, defaultMessage) {
    if (defaultMessage === void 0) { defaultMessage = ""; }
    var segmentedTime = timeDiff;
    try {
        for (var key in timeBreaks) {
            var timeBreakSegments = timeBreaks[key].split("|");
            var timeFraction = parseInt(timeBreakSegments[0] || "1", 10);
            var timeLimit = parseInt(timeBreakSegments[1] || "1", 10);
            segmentedTime = getNewFraction(segmentedTime, timeFraction);
            if (isWithinTimeSegment(segmentedTime, timeLimit)) {
                return segmentedTime + " " + key + " ago";
            }
        }
    }
    catch (e) {
        return defaultMessage;
    }
    return defaultMessage;
};
var getMessageDateTime = function (date, now) {
    var created = new Date(date);
    var timeLapsed = new Date(now).getTime() - created.getTime();
    var timeBreaks = {
        seconds: "1000|60",
        minutes: "60|60",
        hours: "60|24",
    };
    return getTimeMessage(timeLapsed, timeBreaks, created.toLocaleString());
};
exports.getMessageDateTime = getMessageDateTime;
var localStateMessages = {};
var getLocalMessages = function (channelId) {
    return localStateMessages[channelId] || [];
};
exports.getLocalMessages = getLocalMessages;
var setLocalMessages = function (channelId, messages) {
    if (messages.length) {
        localStateMessages[channelId] = __spreadArray([], messages, true);
    }
};
exports.setLocalMessages = setLocalMessages;
