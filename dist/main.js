"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-05-18
 **/
var main_dispatcher_1 = require("./api/main-dispatcher");
var express = require("express");
var app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(main_dispatcher_1.router);
app.listen(8080, function () { return console.log("Server has started"); });
//# sourceMappingURL=main.js.map