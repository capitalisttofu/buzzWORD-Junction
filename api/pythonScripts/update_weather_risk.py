import os
import numpy as np
import random
from pymongo import MongoClient
from classify import classify

mongo_address = os.environ.get("MONGODB_CONNECTION_STRING")

client = MongoClient(mongo_address)

db = client.admin

data_file = "ml_data/data.csv"
data = np.loadtxt(data_file, delimiter=';', skiprows=1, dtype=np.int)

for flight in db.flightsData.find():
    if flight.destination_airport == 'HEL':
        origin = flight.departure_airport
        time = flight.departure_datetime

        random_number_arrival = random.randint(0, len(data) - 1)
        data_vector_arrival = data[random_number_arrival]
        random_number_departure = random.randint(0, len(data) - 1)
        data_vector_departure = data[random_number_departure]
        
        weather_risk_arrival = classify(data_vector_arrival) # run update
        weather_risk_departure = classify(data_vector_departure)  # run update

        flights_collection.update({'_id': flight._id}, {$set: {"weather_risk_arrival": weather_risk_arrival, "weather_risk_departure": weather_risk_departure}})
