import os
import json
from bson import json_util
from pymongo import MongoClient
from pymongo import InsertOne

mongo_address = os.environ.get("MONGODB_CONNECTION_STRING")

client = MongoClient(mongo_address)

db = client.admin

inputFilename = 'input-notes.json'

with open(inputFilename, 'r') as f:
    data = json_util.loads(f)
    result = db.flightsData.insertMany(data)
