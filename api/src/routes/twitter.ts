import * as express from 'express'
import * as t from 'io-ts'
import * as fp from 'fp-ts'
import * as PythonShell from 'python-shell'
import * as path from 'path'
import * as twitterDb from '../db/twitter'
import * as R from 'ramda'
import * as twitterLib from '../lib/twitter'

import {
  ExpressRequest,
  ExpressResponse,
  ErrorResponse,
  Response
} from '../types'

const router = express.Router()

export const getTwitter = async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const data = await twitterLib.getAllTwitterData()
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

router.get('/', getTwitter)

export default router
