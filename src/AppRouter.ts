import express from 'express';

//creating a singleton
//so theres only one router
export class AppRouter {
	private static instance: express.Router;

	static getInstance(): express.Router {
		if (!AppRouter.instance) {
			AppRouter.instance = express.Router();
		}
		return AppRouter.instance;
	}
}
