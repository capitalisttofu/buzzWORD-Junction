import * as express from 'express'
import * as t from 'io-ts'
import * as fp from 'fp-ts'
import * as PythonShell from 'python-shell'
import * as path from 'path'
import * as exampleDb from '../db/example'

import {
  ExpressRequest,
  ExpressResponse,
  ErrorResponse,
  Response
} from '../types'

const router = express.Router()

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

export default router
