import { Router, Request, Response } from 'express';

const router = Router();
//router doing its thing and fetching the login rout and sending back some html for the browser
router.get('/login', (req: Request, res: Response) => {
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

router.post('/login', (req: Request, res: Response) => {
	//using the request object to grab the inputs for email and password form here
	const { email, password } = req.body;
	res.send(email + password);
});

export { router };
