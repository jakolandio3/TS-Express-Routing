import { Router, Request, Response, NextFunction } from 'express';

//defining a new interface for type
interface RequestWithBody extends Request {
	//overiding the request types body object type with our own interface
	body: { [key: string]: string | undefined };
}
//making a middleware
function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.session && req.session.loggedIn) {
		next();
		return;
	}
	res.status(403);
	res.send('Not permitted');
}

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

router.post('/login', (req: RequestWithBody, res: Response) => {
	//using the request object to grab the inputs for email and password form here
	const { email, password } = req.body;
	//this middleware here adds the body property here
	//because middleware adds changes or removes properties from functions/ objects so this can cause issues when working with typescript
	if (email && password && email === 'hi@hi.com' && password === 'password') {
		//setting up a typeguard here
		//mark as logged in using some session data with cookie-session
		req.session = { loggedIn: true };
		//redicrect to root route
		res.redirect('/');
	} else {
		res.send('You must provide a valid email and password');
	}
});

//root route

router.get('/', (req: Request, res: Response) => {
	if (req.session && req.session.loggedIn) {
		res.send(`
    <div>
    <div>You are logged in</div>
    <a href="/logout">Logout</a>
    </div>`);
	} else {
		res.send(`
    <div>
    <div>You are not logged in</div>
    <a href="/login">Login</a>
    </div>`);
	}
});

router.get('/logout', (req: Request, res: Response) => {
	req.session = undefined;
	res.redirect('/');
});

//running to a protected route using the middleware we made
router.get('/protected', requireAuth, (req: Request, res: Response) => {
	res.send(`Welcome to Protected route Logged in user`);
});

export { router };
