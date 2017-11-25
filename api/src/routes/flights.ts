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
    const result = await flightsDB.fetchAllFlightData()
    res.status(200).send({ message: result })
  } catch (e) {
    res.status(500).send({ message: e })
  }
}

router.post('/', postFlights).get('/', getAllFlights)

export default router
