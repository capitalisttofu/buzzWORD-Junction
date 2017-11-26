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
    if flight['PLAN_ARRIVAL_STATION'] == 'HEL':
        origin = flight['PLAN_DEPARTURE_STATION']
        time = flight['PLAN_DEPARTURE_DATETIME_UTC']

        random_number_arrival = random.randint(0, len(data) - 1)
        random_number_departure = random.randint(0, len(data) - 1)
        data_vector_arrival = data[random_number_arrival]
        data_vector_departure = data[random_number_departure]
        
        weather_risk_arrival = classify(data_vector_arrival) # run update
        weather_risk_departure = classify(data_vector_departure)  # run update

        db.flightsData.update_one({'flightID': flight['flightID']}, {'$set': {"weather_risk_arrival": str(weather_risk_arrival), "weather_risk_departure": str(weather_risk_departure)}})
