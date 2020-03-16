import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonLabel,
  IonCardTitle,
  IonCardContent,
  IonRow
} from "@ionic/react";
import UserQueries from "../queries/UserQueries";
import { Container } from "react-bootstrap";

const PredictionsOverview = props => {
  const [predictions, setPredictions] = useState([]);
  const activities = props.activities[1] ? props.activities[1] : [];
  // const userData = props.activities[1] ? props.activities[1][0].patient : [];

  useEffect(() => {
    // UserQueries.getPatientById(props.patientId).then(res => setUserData(res));
    // fetch("/predict")
    //   .then(res => res.json())
    //   .then(data => {
    //     setPredictions(data.result);
    //     console.log(data.result);
    //   });
  }, []);

  const calculateAge = dob => {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const RenderPredictions = () => {
    // console.log(userData);
    const bloodpressureArray = activities.filter(
      activity => activity.id.split("_")[0] === "BloodPressureReading"
    );
    const runningArray = activities.filter(
      activity => activity.id.split("_")[0] === "Running"
    );
    const weightArray = activities.filter(
      activity => activity.id.split("_")[0] === "WeightReading"
    );
    const cyclingArray = activities.filter(
      activity => activity.id.split("_")[0] === "Cycling"
    );
    const walkingArray = activities.filter(
      activity => activity.id.split("_")[0] === "Walking"
    );

    const bloodpressure = bloodpressureArray.map(reading => {
      return [reading.diastolicPressure, reading.systolicPressure];
    });
    const weight = weightArray.map(reading => reading.weight);
    const running = runningArray.map(reading => reading.distance);
    const cycling = cyclingArray.map(reading => reading.distance);
    const walking = walkingArray.map(reading => reading.distance);
    const diastolicPressure = bloodpressure.map(diastolicP => diastolicP[0]);
    const systolicPressure = bloodpressure.map(systolicP => systolicP[1]);

    const avgDiastolicPressure =
      diastolicPressure.length !== 0
        ? diastolicPressure.reduce((a, b) => a + b, 0) /
          diastolicPressure.length
        : 0;

    const avgSystolicPressure =
      systolicPressure.length !== 0
        ? systolicPressure.reduce((a, b) => a + b, 0) / systolicPressure.length
        : 0;

    const avgWeight =
      weight.length !== 0
        ? weight.reduce((a, b) => a + b, 0) / weight.length
        : 0;

    let totalDistance =
      running.length !== 0 ? running.reduce((a, b) => a + b, 0) : 0;

    totalDistance +=
      cycling.length !== 0 ? cycling.reduce((a, b) => a + b, 0) : 0;

    totalDistance +=
      walking.length !== 0 ? walking.reduce((a, b) => a + b, 0) : 0;
    const age = calculateAge(new Date(activities[0].patient.dob));

    fetch(
      `/predict/${age}/${activities[0].gender}/${avgWeight}/${avgDiastolicPressure}/${avgSystolicPressure}/${totalDistance}`
    )
      .then(res => res.json())
      .then(data => {
        setPredictions(data.result);
        console.log(data.result);
      });
    return (
      <div>
        <IonCard>
          <IonCardContent>
            <IonTitle>PLACE GRAPH HERE</IonTitle>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            {predictions.length !== 0 ? (
              <IonCardTitle>
                This patient is predicted to have {predictions} hypertension
              </IonCardTitle>
            ) : (
              <IonCardTitle>Predicting data...</IonCardTitle>
            )}
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Average bloodpressure</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <Container>
              <IonRow>
                <IonLabel>
                  Average Diastolic Pressure: {avgDiastolicPressure}mmhg
                </IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel>
                  Average Systolic Pressure: {avgSystolicPressure}mmhg
                </IonLabel>
              </IonRow>
            </Container>
          </IonCardContent>
        </IonCard>
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent>
        {console.log(activities)}
        {activities && activities.length === 0 && (
          <IonCard>
            <IonCardHeader>
              <IonLabel
                style={{
                  textAlign: "center",
                  fontSize: "1.2em"
                }}
              >
                No data recorded
              </IonLabel>
              {!activities[0] && console.log(activities[0])}
            </IonCardHeader>
          </IonCard>
        )}
        {activities && activities[0] && <RenderPredictions />}
      </IonContent>
      <IonFooter>
        <IonButton
          size="large"
          expand="block"
          onClick={() => props.setDisplayPredictions(false)}
        >
          <IonTitle>Close</IonTitle>
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default PredictionsOverview;
