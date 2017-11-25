import { MongoError } from 'mongodb'
import db from '../lib/mongodb'
import { Flight } from './../types'

const collectionName = 'flightsData'

export const addFlightData = (flights: Flight[]) => {
  return new Promise<string>((resolve, reject) =>
    db()
      .collection(collectionName)
      .insert(flights, (err: MongoError, result) => {
        if (err) {
          reject(err)
        }
        resolve('Inserted flightData successfully')
      })
  )
}

export const fetchAllFlightData = () => {
  return new Promise<Flight[]>((resolve, reject) => {
    db()
      .collection(collectionName)
      .find({})
      .toArray((err: MongoError, result: Flight[]) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
  })
}
