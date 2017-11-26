import * as express from 'express'
import * as t from 'io-ts'
import * as fp from 'fp-ts'
import * as PythonShell from 'python-shell'
import * as path from 'path'
import * as twitterDb from '../db/twitter'
import * as R from 'ramda'
import * as twitterLib from '../lib/twitter'
import * as flightsDB from '../db/flights'
import * as flightsLib from '../lib/flights'

import {
  ExpressRequest,
  ExpressResponse,
  ErrorResponse,
  Response
} from '../types'

const router = express.Router()

export const updateTwitter = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const twitterData = await twitterLib.getAllTwitterData()
    console.log('twitter??', twitterData)
    const updatedData = await twitterLib.updateAllTwitterData(twitterData)
    const fetchedTwitterData = await twitterDb.fetchAllTwitterData()
    const flightData = await flightsDB.fetchAllFlightData()
    // console.log('flightData', flightData)
    const updatedStuff = twitterLib.updateFlightDataBasedTwitter(
      flightData,
      fetchedTwitterData
    )
    console.log('wat is here?', updatedStuff.length)
    const result = await flightsLib.updateAllFlightData(updatedStuff)
    res
      .status(200)
      .send('Successfully updated ' + result.length + ' flight data')
  } catch (e) {
    res.status(500).send(e)
  }
}

export const getAllTwitterData = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const data = await twitterDb.fetchAllTwitterData()
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

export const getPython = (req: ExpressRequest, res: ExpressResponse) => {
  const options = {
    args: [req.params.name]
  }
  PythonShell.run('pythonScripts/test.py', options, (err, data) => {
    if (err) res.status(500).send(err)
    try {
      const parsed = JSON.parse(data)
      res.status(200).send(parsed)
    } catch (e) {
      res.status(500).send(e)
    }
  })
}

router.get('/update', updateTwitter).get('/', getAllTwitterData)

export default router
