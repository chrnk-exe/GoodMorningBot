import { Express, Request} from "express"
import { Query } from 'express-serve-static-core'

export interface TypedRequestBody<T> extends Request { body: T }
export interface TypedRequestQuery<T extends Query> extends Request { query: T }
