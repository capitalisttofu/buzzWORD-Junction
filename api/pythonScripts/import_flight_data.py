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
    one = []
    two = []
    five = []
    ten = []
    flight = asia_flight_data[x]
    flight['flightID'] = 'A' + str(x+1)
    for member in connection_data[x]:
        if (member['_row'][:2] == 'on'):
            one.append(member[str(x+1)])
        elif (member['_row'][:2] == 'tw'):
            two.append(member[str(x+1)])
        elif (member['_row'][:2] == 'fi'):
            five.append(member[str(x+1)])
        elif (member['_row'][:2] == 'te'):
            ten.append(member[str(x+1)])
    flight['connector_flights_1h'] = one
    flight['connector_flights_2h'] = two
    flight['connector_flights_5h'] = five
    flight['connector_flights_10h'] = ten

    flights.append(flight)

for flight in europe_flight_data:
    flights.append(flight)


result = db.flightsData.insert_many(flights)