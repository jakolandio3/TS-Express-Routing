"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
//making a middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var router = (0, express_1.Router)();
exports.router = router;
//router doing its thing and fetching the login rout and sending back some html for the browser
router.get('/login', function (req, res) {
    res.send("\n  <form method=\"POST\">\n  <div>\n  <label>Email</label>\n  <input name=\"email\"/>\n  </div>\n  <div>\n  <label>Password</label>\n  <input name=\"password\" type=\"password\"/>\n  </div>\n  <button>Submit</button>\n  </form>");
});
router.post('/login', function (req, res) {
    //using the request object to grab the inputs for email and password form here
    var _a = req.body, email = _a.email, password = _a.password;
    //this middleware here adds the body property here
    //because middleware adds changes or removes properties from functions/ objects so this can cause issues when working with typescript
    if (email && password && email === 'hi@hi.com' && password === 'password') {
        //setting up a typeguard here
        //mark as logged in using some session data with cookie-session
        req.session = { loggedIn: true };
        //redicrect to root route
        res.redirect('/');
    }
    else {
        res.send('You must provide a valid email and password');
    }
});
//root route
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n    <div>\n    <div>You are logged in</div>\n    <a href=\"/logout\">Logout</a>\n    </div>");
    }
    else {
        res.send("\n    <div>\n    <div>You are not logged in</div>\n    <a href=\"/login\">Login</a>\n    </div>");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
//running to a protected route using the middleware we made
router.get('/protected', requireAuth, function (req, res) {
    res.send("Welcome to Protected route Logged in user");
});
