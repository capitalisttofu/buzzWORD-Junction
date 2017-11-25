import { MongoError } from 'mongodb'
import db from '../lib/mongodb'
import {} from './../types'

const collectionName = 'weatherData'

export const addWeatherData = (weatherData: Object[]) => {
  return new Promise<string>((resolve, reject) =>
    db()
      .collection(collectionName)
      .insert(weatherData, (err: MongoError, result) => {
        if (err) {
          reject(err)
        }
        resolve('Inserted weatherData successfully')
      })
  )
}
