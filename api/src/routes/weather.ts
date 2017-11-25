import * as express from 'express'
import * as t from 'io-ts'
import * as fp from 'fp-ts'
import * as PythonShell from 'python-shell'
import * as path from 'path'
import * as weatherDataDB from '../db/weather'

import {
  ExpressRequest,
  ExpressResponse,
  ErrorResponse,
  Response,
  Flight
} from '../types'

const router = express.Router()

export const postWeather = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const result = await weatherDataDB.addWeatherData(req.body.data)
    res.status(200).send({ message: result })
  } catch (e) {
    res.status(500).send({ message: e })
  }
}

router.post('/', postWeather)

export default router
