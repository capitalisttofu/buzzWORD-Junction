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

export const iFlight = t.intersection([
  t.interface({
    PLAN_CARRIER_CODE: t.string,
    PLAN_FLIGHT_NUMBER: t.string,
    PLAN_DEPARTURE_DATETIME_UTC: t.string,
    PLAN_ARRIVAL_DATETIME_UTC: t.string,
    PLAN_DEPARTURE_STATION: t.string,
    PLAN_ARRIVAL_STATION: t.string,
    _id: t.string,
    FlightId: t.string,
    connector_flights_1h: t.array(t.string),
    connector_flights_2h: t.array(t.string),
    connector_flights_5h: t.array(t.string),
    connector_flights_10h: t.array(t.string)
  }),
  t.partial({
    weather_risk_arrival: t.number,
    weather_risk_departure: t.number,
    twitter_risk_arrival: t.number,
    twitter_risk_departure: t.number,
    schedule_risk: t.number,
    overall_risk: t.number,
    twitterTrends: t.array(t.string)
  })
])

export type Flight = t.TypeOf<typeof iFlight>

export type ExpressResponse = express.Response
