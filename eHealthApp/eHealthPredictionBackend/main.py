import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.naive_bayes import GaussianNB

import json
import flask
import time
from flask import request
import csv

app = flask.Flask("__main__")

@app.route("/predict/<age>/<gender>/<weight>/<dp>/<sp>/<distancetravelled>")
def my_index(age, gender, weight, dp, sp, distancetravelled):
    g = 1
    if (gender == 'Female'):
        g = 0

    with open('Dataset/userTestData.csv', 'w', newline='') as f:
        thewriter = csv.writer(f)
        thewriter.writerow(['User_ID','Age','Gender','DP','SP','Distance'])
        thewriter.writerow([0, age, g, dp, sp, distancetravelled])
    result = predict_hypertension()
    return result

def predict_hypertension():
    #Load data files
    train=pd.read_csv("Dataset/userTrainData.csv")
    test=pd.read_csv("Dataset/userTestData.csv")
    
    #Find missing values 
    train.isnull().sum()
    test.isnull().sum()

    #Impute missing values with mean (numerical variables)
    train.fillna(train.mean(),inplace=True) 
    train.isnull().sum()

    #Test data
    test.fillna(test.mean(),inplace=True) 
    test.isnull().sum()

    #Remove User_ID variable - Irrelevant
    train=train.drop('User_ID',axis=1)
    test = test.drop('User_ID', axis=1)
    
    #Create target variable
    data=train.drop('Hypertension',1)
    target=train.Hypertension

    #Build dummy variables for categorical variables
    data=pd.get_dummies(data)
    train=pd.get_dummies(train)
    test = pd.get_dummies(test)
    
    #Split train data for cross validation
    x_train,x_cv,y_train,y_cv = train_test_split(data,target,test_size=0.2)
    #(e)NAIVE BAYES ALGORITHM

    nb=GaussianNB()
    nb.fit(x_train, y_train)

    # print(x_train)
    #Predict values for cv data
    print(x_cv)
    pred_cv4=nb.predict(x_cv)
    pred_cv5 = nb.predict(test)
    print(pred_cv5)
    # print(pred_cv5)
    return {'result': pred_cv5[0]}

# app.run(debug=True)
