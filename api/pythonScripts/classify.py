from sklearn.externals import joblib
from sklearn import svm
import numpy as np


def classify(data_vector):

    # Read data to be classified
    data = np.array(data_vector).reshape(1, -1)

    clf = joblib.load('ml_data/svm_classifier.pkl')

    # Classify the test data
    print("Classifying")
    prediction_label = clf.predict(data)[0]

    return prediction_label
