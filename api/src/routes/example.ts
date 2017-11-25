import * as express from 'express'
import * as t from 'io-ts'
import * as fp from 'fp-ts'
import * as PythonShell from 'python-shell'
import * as path from 'path'

import {
  ExpressRequest,
  ExpressResponse,
  ErrorResponse,
  Response
} from '../types'

const router = express.Router()

import twitterconf from '../config'
import * as Twit from 'twit'
const twit = new Twit(twitterconf)

const airportToWOEID = {
  ARN: 906057,
  BRU: 968019,
  CDG: 615702,
  DUS: 646099,
  EDI: 19344,
  FRA: 650272,
  GOT: 890869,
  LHR: 44418,
  MAN: 28218,
  MUC: 676757,
  MXP: 718345,
  OSL: 862592,
  VIE: 551801,
  ZRH: 784794,
  BCN: 753692,
  BKK: 1208341,
  FCO: 721943,
  KIX: 15015370,
  MAD: 766273
}

export const getTwitter = (req: ExpressRequest, res: ExpressResponse) =>
  twit.get(
    'trends/place',
    { id: airportToWOEID[req.query.id] },
    (err, data) => {
      const sum = data[0].trends
        .filter(obj => obj.tweet_volume)
        .slice(0, 5)
        .reduce(
          (acc, obj) => ({
            sum: acc + obj.tweet_volume,
            tags: acc.tags.append(obj.asd)
          }),
          { sum: 0, tags: [] }
        )
      res.status(200).send({ sum: sum })
    }
  )

export const getExample = (req: ExpressRequest, res: ExpressResponse) => {
  res.status(200).send({ name: 'example name', id: 0 })
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

router
  .get('/', getExample)
  .get('/python/:name', getPython)
  .get('/twitter', getTwitter)

export default router
