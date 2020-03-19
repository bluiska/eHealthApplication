# eHealth Prediction Layer (PL)

The eHealth Prediction Layer is a python-based layer that enables a health professional to perform predictions based on the activity data that the patient submits. It uses the Flask web framework for developing and deploying a web application that hosts the prediction algorithm. The prediction algorithm is a machine learning algorithm that was developed in Python. It utilizes the NAIVE BAYES CLASSIFIER ALGORITHM to predict and classify the activity data that the patient enters for today. The machine learning algorithm is trained used a training dataset that is designed to cover as may different scenarios (different age/gender/gp/sp/weight/exercise) as possible. The machine learning algorithm predicts the likelyhood of the patient developing coronary heart disease.

Whenever a value is predicted, the parmeters and the predicted result is appended to the training dataset. This means that any future predictions will be more accurate as the prediction alogithm will constantly be learning and evolving from the users data.

The eHealth Prediction Layer is designed to be a tool to aid the diagnostics that health professionals perform.

In terms of testing, units test have been written to test the functionality of the enhancement. I also performed a user ususablity test, the results of which can be found in the INDIVIDUAL_ENHANCEMENT_USER_EVAL folder. Exploratory tests were heavily used to both test the ui of the application and to test the integrety of the machine learning prediction algorithm.

## Prerequisites

- React Ionic
- Flask
- NodeJS

## 1. Preamble

_It is recommended to clone the entire eHealth repository comprising of the frontend as well as the prediction or backend applications._

Before starting the deployment, clone this repository. After cloning, ensure that the repository folder is inside your personal GitHub directory. Then follow through this instruction sequentially.

## 2. Deploying flask prediction web application

Prior to deploying the web application, you need to open a new terminal window and cd into the directory where the project is located.

Issue the following commands for launching the PL in localhost mode:

```
cd \eHealthApplication\eHealthApp
npm run start-backend
```

This will deploy the flask prediciton web application on http://127.0.0.1:5000/ and you should see the following message:

- Serving Flask app "main.py" (lazy loading)
- Environment: development
- Debug mode: on
- Restarting with stat
- Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)

## 3. Deploying eHealth application

Prior to deploying the ehealth application, it is important that npm is installed. To do so, cd into the \eHealthApplication\eHealthApp directory and run the command 'npm install'.
This will install all the dependencies that are needed to run the application.

To deploy the eHealth application, you need to ensure that you are in the \eHealthApplication\eHealthApp directory and run the command 'ionic serve'. You might be prompted about if you wish to install react-scripts at which point you should type in 'y' and press enter.

If the deployment failed and you receive a 'BrowserslistError' error, you will need to delete the following files from the directory: browserslist, browserslist.cmd, browserslist.ps1.
Run the 'ionic serve' command once more and the application should successfully deploy

Once deployed, the application will automatically be displayed on the scrren running on http://localhost:8100/.

## 4. Performing a prediction

To perform a prediction on the flask web application, you must first have the eHealth application and flask web application deployed. On the eHealth frontend, select a doctor, then select a patient with activity data that has be recorded today that must contain at least 1 physical activity (run/cycle/walk) and at least 1 blood pressure reading. Click the 'View Predictions' button to calculate and retrieve a prediction.

## 5. Testing

Prior to running the unit tests, it is important npm is installed. To do so, cd into the \eHealthApplication\eHealthApp directory and run the following command

```
npm install
```

This will install all the dependencies that are needed to run the application.

To run the tests for the eHealth application, you need to ensure that you are in the \eHealthApplication\eHealthApp directory and run the following command:

```
npm test
```

Once the command is ran, all the unit tests will start running with the results being displayed on the console.

## 5. Filter activity by date

The functionality of the filter component has been enhanced. When the user filters by date, all activities within the specified age range are retrieved from the db and rendered to the screen.
