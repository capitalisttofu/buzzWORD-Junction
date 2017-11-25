import { MongoClient, Db } from 'mongodb'
import * as assert from 'assert'

const url = process.env.MONGODB_CONNECTION_STRING

let db: Db

if (url) {
  const mongo = MongoClient.connect(url, (err, connection) => {
    assert.equal(null, err)
    assert.ok(connection != null)
    console.log('MongoDB connection established')
    db = connection
  })
}

export default () => db
