import * as express from 'express'
import * as t from 'io-ts'
import * as fp from 'fp-ts'
import * as PythonShell from 'python-shell'
import * as path from 'path'
import * as exampleDb from '../db/example'
import * as R from 'ramda'

import {
  ExpressRequest,
  ExpressResponse,
  ErrorResponse,
  Response
} from '../types'

const router = express.Router()

const twitterconf = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
}

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

export type TwitterType = {
  tweet_volume: number | null
  name: string
}

export const getTwitter = (req: ExpressRequest, res: ExpressResponse) =>
  twit.get(
    'trends/place',
    { id: airportToWOEID[req.query.id] },
    (err, data) => {
      const stuff = R.compose(
        R.reduce(
          (acc, obj: TwitterType) => ({
            sum: acc.sum + obj.tweet_volume,
            tags: acc.tags.concat(obj.name)
          }),
          { sum: 0, tags: [] }
        ),
        R.take(5),
        R.sortBy((obj: TwitterType) => obj.tweet_volume),
        R.filter((obj: TwitterType) => !!obj.tweet_volume)
      )(data[0].trends)

      res.status(200).send({ data: stuff })
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

export const postMongo = async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const result = await exampleDb.addExampleData(req.body.name)
    res.status(200).send({ message: result })
  } catch (e) {
    res.status(500).send({ message: e })
  }
}

export const getMongo = async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const result = await exampleDb.fetchExampleData()
    res.status(200).send({ message: result })
  } catch (e) {
    res.status(500).send({ message: e })
  }
}

router
  .get('/', getExample)
  .get('/python/:name', getPython)
  .post('/mongo', postMongo)
  .get('/mongo', getMongo)
  .get('/twitter', getTwitter)

export default router
