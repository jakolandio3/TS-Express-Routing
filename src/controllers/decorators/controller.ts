import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, Request, Response, RequestHandler } from 'express';
//chekcing function
function bodyValidators(keys: string[]): RequestHandler {
	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.body) {
			res.status(422).send('Invalid request');
			return;
		}
		for (let key of keys) {
			if (!req.body[key]) {
				res.status(422).send(`missing key ${key}`);
				return;
			}
		}
		next();
	};
}
//this middleware just checks if the keys are in the request

export function controller(mainRoute: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();

		for (let key in target.prototype) {
			const routeHandler = target.prototype[key];
			//essentially were grabing the function at each method with a path defined
			const path = Reflect.getMetadata(
				MetadataKeys.path,
				target.prototype,
				key
			);
			//grabbing the path off each method with a decorator
			//adding it to a router
			const method: Methods = Reflect.getMetadata(
				MetadataKeys.method,
				target.prototype,
				key
			);
			const middlewares =
				Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
				[];
			const requiredBodyProps =
				Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
				[];
			const validator = bodyValidators(requiredBodyProps);
			if (path) {
				router[method](
					mainRoute + path,
					...middlewares,
					validator,
					routeHandler
				);
			}
		}
	};
}
