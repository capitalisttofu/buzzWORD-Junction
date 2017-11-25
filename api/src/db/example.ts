import { MongoError } from 'mongodb'
import db from '../lib/mongodb'
import {} from './../types'

const collectionName = 'exampleData'

export const addExampleData = (name: string) => {
  return new Promise<string>((resolve, reject) =>
    db()
      .collection(collectionName)
      .insert({ name }, (err: MongoError, result) => {
        if (err) {
          reject(err)
        }
        resolve('Inserted exampleData successfully')
      })
  )
}

export type ExampleData = {
  name: string
}

export const fetchExampleData = () => {
  return new Promise<ExampleData[]>((resolve, reject) => {
    db()
      .collection(collectionName)
      .find({})
      .toArray((err: MongoError, result: ExampleData[]) => {
        if (err) {
          reject(err)
        } else {
          console.log(result)
          resolve(result)
        }
      })
  })
}
