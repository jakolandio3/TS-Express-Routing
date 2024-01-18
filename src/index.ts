import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
const app = express();
//parsing the body of the form with body parser so we can access some of the elements inside
//app is listening on port 3000 for us here then the routing is taking care of the rest
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(3000, () => {
	console.log('listening on 3000');
});
