import os
from pymongo import MongoClient

mongo_address = os.environ.get("MONGODB_CONNECTION_STRING")

client = MongoClient(mongo_address)

db = client.admin

for flight in db.flightsData.find():
    if flight.destination_airport == 'HEL':
        origin = flight.departure_airport
        time = flight.departure_datetime
        
        weather_risk = # run update

        flights_collection.update({'_id': flight._id}, {$set: {"weather_risk": weather_risk}})
