# buzzWORD

Repo for Junction 2017 project for team buzzWORD

## Init Front

`cd front`

`npm i`

`npm start`

Front runs in port 8080

## Init Api

`cd api`

`npm i`

`pip install numpy` `pip install sklearn` `pip install pymongo`

`cd pythonScripts` `python import_flight_data.py`

`npm run build`

`npm start`

Api runs in port 8000

## Machine Learning Instructions

All python scripts are located in /api/pythonScripts/ folder.

The existing model file, named svm_classifier.pkl, is located in the
folder ml_data, along with the weather data and labels.

To initialize a new model from scratch, for example if the model file
doesn't exist, call the `train()` function in the train_model_init.py
file.

To re-train the model, call the `train(new_vector, new_label)` function
in the train_model.py file. The new_vector parameter must be an array
that contains all the necessary 29 features
(features specified in ml_data/data.csv file). The new_label parameter is the
corresponding label for the data array. Allowed values for the label are
0, 1 and 2.

To classify a weather data vector, call the `classify(data_vector)`
function in the classify.py file. The data_vector parameter must be an
array that contains all the necessary 29 features
(features specified in ml_data/data.csv file).