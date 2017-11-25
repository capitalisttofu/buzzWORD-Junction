import { MongoError } from 'mongodb'
import db from '../lib/mongodb'
import { MappedTwitterData } from './../types'

const collectionName = 'twitterData'

export const putTwitterData = (data: MappedTwitterData) => {
  return new Promise<string>((resolve, reject) =>
    db()
      .collection(collectionName)
      .findOneAndUpdate(
        { airport: data.airport },
        data,
        { upsert: true },
        (err: MongoError, result) => {
          if (err) {
            reject(err)
          }
          resolve('Inserted twitterData successfully')
        }
      )
  )
}

export const fetchAllTwitterData = () => {
  return new Promise<MappedTwitterData[]>((resolve, reject) => {
    db()
      .collection(collectionName)
      .find({})
      .toArray((err: MongoError, result: MappedTwitterData[]) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
  })
}
