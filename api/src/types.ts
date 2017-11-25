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

export type Twitter = {
  tweet_volume: number | null
  name: string
}

export type MappedTwitterData = {
  airport: string
  diff: number
  sum: number
  tags: string[]
}

export type FlightIdAlias = string

export type Flight = {
  PLAN_CARRIER_CODE: string
  PLAN_FLIGHT_NUMBER: string
  PLAN_DEPARTURE_DATETIME_UTC: string
  PLAN_ARRIVAL_DATETIME_UTC: string
  PLAN_DEPARTURE_STATION: string
  PLAN_ARRIVAL_STATION: string
  _id: string
  FlightId: FlightIdAlias
  weather_risk?: number
  twitter_risk?: number
  schedule_risk?: number
  overall_risk?: number
  connector_flights_1h: FlightIdAlias[]
  connector_flights_2h: FlightIdAlias[]
  connector_flights_5h: FlightIdAlias[]
  connector_flights_10h: FlightIdAlias[]
}

export type ExpressResponse = express.Response
