import * as http from 'http'
import * as fs from 'fs'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import exampleRouter from './routes/twitter'
import flightsRouter from './routes/flights'
import weatherRouter from './routes/weather'

import { ExpressRequest, ExpressResponse } from './types'

const port = 8000

const apiRouter = express.Router()
apiRouter
  .use('/twitter', exampleRouter)
  .use('/flights', flightsRouter)
  .use('/status', (req, res) => res.status(200).send(true))

const app = express()
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Methods',
      'GET, HEAD, POST, PUT, DELETE, PATCH'
    )
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header('Allow', req.header('Access-Control-Request-Method'))

    next()
  })
  .use('/api', apiRouter)

app.use((err, req, res, next) => {
  if (err.code) {
    res.status(err.code).send({ message: err.message })
  }
  res.send(err)
})

const httpServer: http.Server = http.createServer(app)

httpServer.listen(port)
