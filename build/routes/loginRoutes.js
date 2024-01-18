"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
//router doing its thing and fetching the login rout and sending back some html for the browser
router.get('/login', (req, res) => {
    res.send(`
  <form method="POST">
  <div>
  <label>Email</label>
  <input name="email"/>
  </div>
  <div>
  <label>Password</label>
  <input name="password" type="password"/>
  </div>
  <button>Submit</button>
  </form>`);
});
router.post('/login', (req, res) => {
    //using the request object to grab the inputs for email and password form here
    const { email, password } = req.body;
    res.send(email + password);
});
