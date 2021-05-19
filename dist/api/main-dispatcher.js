"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-05-19
 **/
var question_dispatcher_1 = require("./question-dispatcher");
var express = require("express");
exports.router = express.Router();
exports.router.use(question_dispatcher_1.router);
//# sourceMappingURL=main-dispatcher.js.map