import { Request} from 'express';
import { Query } from 'express-serve-static-core';

export interface TypedRequestBody<T> extends Request { 
    body: {
        headers: {
            [header: string]: string
        }; 
        data: T 
    } 
}
export interface TypedRequestQuery<T extends Query> extends Request { query: T }
