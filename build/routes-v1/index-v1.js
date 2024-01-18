"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginRoutes_1 = require("../routes/loginRoutes");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = (0, express_1.default)();
//parsing the body of the form with body parser so we can access some of the elements inside
//app is listening on port 3000 for us here then the routing is taking care of the rest
app.use(body_parser_1.default.urlencoded({ extended: true }));
//body parser adds in a body property
app.use((0, cookie_session_1.default)({ keys: ['loginData'] }));
//cookie session ads a cookie session property for storing some data in a key/value on a cookie
app.use(loginRoutes_1.router);
app.listen(3000, function () {
    console.log('listening on 3000');
});