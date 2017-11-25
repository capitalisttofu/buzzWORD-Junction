import { MongoError } from 'mongodb'
import db from '../lib/mongodb'
import {} from './../types'

export const addExampleData = (name: string) => {
  return new Promise<string>((resolve, reject) =>
    db()
      .collection('exampleData')
      .insert({ name }, (err: MongoError, result) => {
        if (err) {
          reject(err)
        }
        resolve('Inserted exampleData successfully')
      })
  )
}
