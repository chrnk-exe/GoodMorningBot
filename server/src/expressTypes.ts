import { Request } from 'express';
import { Query } from 'express-serve-static-core';
import { Request as JWTRequest } from 'express-jwt';

export interface TypedRequestBody<T> extends JWTRequest { 
    body: T 

}
export interface TypedRequestQuery<T extends Query> extends Request { query: T }
