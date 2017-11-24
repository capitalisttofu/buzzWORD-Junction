import * as express from 'express'
import * as t from 'io-ts'
import * as fp from 'fp-ts'

import {
  ExpressRequest,
  ExpressResponse,
  ErrorResponse,
  Response
} from './../types'

const router = express.Router()

export const getExample = (req: ExpressRequest, res: ExpressResponse) => {
  res.status(200).send({ name: 'example name', id: 0 })
}

export const getPython = (req: ExpressRequest, res: ExpressResponse) => {
  res.status(200).send({ name: 'example name', id: 0 })
}

router.get('/', getExample).get('/python', getPython)

export default router
