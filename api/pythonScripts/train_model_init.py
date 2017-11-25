import numpy as np
from sklearn.utils import shuffle
from sklearn import svm
from sklearn.metrics import accuracy_score
from sklearn.externals import joblib


def train():
    # Read train data and labels
    train_data_file = "ml_data/data.csv"
    train_data_labels = "ml_data/labels.csv"
    data = np.loadtxt(train_data_file, delimiter=';', skiprows=1, dtype=np.int)
    labels = np.loadtxt(train_data_labels, delimiter=';', skiprows=1, dtype=np.int)

    # Shuffle
    print("Shuffling")
    data, labels = shuffle(data, labels)

    # Divide the training data set to train and test
    data_length = len(data)
    train_data_length = int(data_length * 0.75)
    train_data = data[:train_data_length]
    train_labels = labels[:train_data_length]
    test_data = data[train_data_length:]
    test_labels = labels[train_data_length:]

    # Create and train the SVC (Support Vector Classifier)
    print("Training the model")
    clf = svm.SVC(kernel="rbf")
    clf.fit(train_data, train_labels)

    # Classify the test data
    print("Classifying")
    prediction_labels = clf.predict(test_data)

    # Compare and get the classification accuracy
    print("Classification accuracy: ", accuracy_score(test_labels, prediction_labels))

    # Create/replace model file for later use
    joblib.dump(clf, 'ml_data/svm_classifier.pkl')
