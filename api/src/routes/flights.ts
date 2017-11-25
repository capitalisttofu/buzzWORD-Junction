import * as express from 'express'
import * as t from 'io-ts'
import * as fp from 'fp-ts'
import * as PythonShell from 'python-shell'
import * as path from 'path'
import * as flightsDB from '../db/flights'

import {
  ExpressRequest,
  ExpressResponse,
  ErrorResponse,
  Response,
  Flight
} from '../types'

export const flightMockData: Flight[] = [
  {
    PLAN_CARRIER_CODE: 'AY',
    PLAN_FLIGHT_NUMBER: 'AY 123',
    PLAN_DEPARTURE_DATETIME_UTC: 'Sat Nov 25 2017 13:56:45 GMT+0200 (EET)',
    PLAN_ARRIVAL_DATETIME_UTC: 'Sat Nov 25 2017 16:56:45 GMT+0200 (EET)',
    PLAN_DEPARTURE_STATION: 'HEL',
    PLAN_ARRIVAL_STATION: 'OSL',
    _id: '123123123213',
    flightID: '000000000',
    weather_risk_arrival: 5,
    weather_risk_departure: 0,
    twitter_risk_arrival: 2,
    twitter_risk_departure: 1,
    schedule_risk: 3,
    overall_risk: 4,
    connector_flights_1h: ['11111111', '2222222'],
    connector_flights_2h: [],
    connector_flights_5h: [],
    connector_flights_10h: []
  },
  {
    PLAN_CARRIER_CODE: 'AY',
    PLAN_FLIGHT_NUMBER: 'AY 55',
    PLAN_DEPARTURE_DATETIME_UTC: 'Sat Nov 12 2017 11:56:45 GMT+0200 (EET)',
    PLAN_ARRIVAL_DATETIME_UTC: 'Sat Nov 12 2017 17:56:45 GMT+0200 (EET)',
    PLAN_DEPARTURE_STATION: 'ARN',
    PLAN_ARRIVAL_STATION: 'HEL',
    _id: '31231232132133',
    flightID: '11111111',
    weather_risk_arrival: 1,
    weather_risk_departure: 1,
    twitter_risk_arrival: 3,
    twitter_risk_departure: 1,
    schedule_risk: 2,
    overall_risk: 1,
    connector_flights_1h: [],
    connector_flights_2h: [],
    connector_flights_5h: [],
    connector_flights_10h: []
  }
]

const router = express.Router()

export const postFlights = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const result = await flightsDB.addFlightData(req.body.flights)
    res.status(200).send({ message: result })
  } catch (e) {
    res.status(500).send({ message: e })
  }
}

export const getAllFlights = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    res.status(200).send(flightMockData)
  } catch (e) {
    res.status(500).send({ message: e })
  }
}

router.post('/', postFlights).get('/', getAllFlights)

export default router
