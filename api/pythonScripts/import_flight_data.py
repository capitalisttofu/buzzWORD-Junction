import os
import json
from pymongo import MongoClient

mongo_address = os.environ.get("MONGODB_CONNECTION_STRING")

client = MongoClient(mongo_address)

db = client.admin

connection_data_file = 'connection_data.json'
europe_flights_file = 'europe_flights.json'
asian_flights_file = 'asia_flights.json'

connection_data = json.loads(open(connection_data_file, "r").read())
europe_flight_data = json.loads(open(europe_flights_file, "r").read())
asia_flight_data = json.loads(open(asian_flights_file, "r").read())

flights = []

for x in range(0, 39):
    flight = asia_flight_data[x]
    flight['flightID'] = 'A' + str(x+1)
    flight['connector_flights'] = connection_data[x]
    flights.append(flight)

for flight in europe_flight_data:
    flights.append(flight)

result = db.flightsData.insert_many(flights)