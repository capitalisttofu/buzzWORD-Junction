import numpy as np
from sklearn import svm
from sklearn.externals import joblib


def train(new_vector, new_label):

    # Read train data and labels
    train_data_file = "ml_data/data.csv"
    train_data_labels = "ml_data/labels.csv"
    data = np.loadtxt(train_data_file, delimiter=';', skiprows=1, dtype=np.int)
    labels = np.loadtxt(train_data_labels, delimiter=';', skiprows=1, dtype=np.int)

    # Add new data to existing data set
    np.append(data, [new_vector], axis=0)
    np.append(labels, [new_label], axis=0)

    # Create and train the SVC
    clf = svm.SVC(kernel="rbf")
    clf.fit(data, labels)

    # Create/replace model file for later use
    joblib.dump(clf, 'ml_data/svm_classifier.pkl')
