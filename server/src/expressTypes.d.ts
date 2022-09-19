declare interface TypedRequestBody<T> extends Express.Request { body: T }
declare interface TypedRequestQuery<T extends Express.Request.QueryString.ParsedQs> extends Express.Request { query: T}