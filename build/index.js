"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRoutes_1 = require("./routes/loginRoutes");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//parsing the body of the form with body parser so we can access some of the elements inside
//app is listening on port 3000 for us here then the routing is taking care of the rest
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(loginRoutes_1.router);
app.listen(3000, () => {
    console.log('listening on 3000');
});
