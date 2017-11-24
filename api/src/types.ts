import * as express from 'express'
import * as t from 'io-ts'
import * as fs from 'fs'
import * as request from 'request'

export type Response<Message = any> = { status: number; message: Message }
export type ErrorResponse<Message = any> = Response<Message>

export type ExpressHeaders = {
  authorization: string
}

export interface ExpressRequest<Params = any, Body = any, Query = any>
  extends express.Request {
  headers: ExpressHeaders
  path: string
  query: Query
  params: Params
  body: Body
}

export type ExpressResponse = express.Response
