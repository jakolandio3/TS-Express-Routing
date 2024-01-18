import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
	value?: RequestHandler;
}

function routeBinder(method: string) {
	return function (path: string) {
		return function (target: any, key: string, desc: RouteHandlerDescriptor) {
			Reflect.defineMetadata(MetadataKeys.path, path, target, key);
			Reflect.defineMetadata(MetadataKeys.method, method, target, key);
			//this puts a route value on a route key for the object remember it can be 4 args
		};
	};
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
//easy way to duplicate the same code
