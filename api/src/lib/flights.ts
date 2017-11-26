import * as Twit from 'twit'
import * as R from 'ramda'
import { Twitter, MappedTwitterData, Flight } from '../types'
import * as gaussian from 'gaussian'
import * as db from '../db/flights'

export const updateAllFlightData = (data: Flight[]) => {
  return new Promise<string[]>((res, rej) => {
    Promise.all(R.map((flight: Flight) => db.putFlightData(flight))(data)).then(
      data => res(data),
      err => rej(err)
    )
  })
}
