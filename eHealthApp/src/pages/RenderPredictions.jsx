import React, { useState } from "react";
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
import { Container } from "react-bootstrap";
import { Pie, Line } from "react-chartjs-2";

const RenderPredictions = props => {
  /*
   * @param {Date} dob - date of birth of the patient
   */
  const calculateAge = dob => {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };
  const [predictions, setPredictions] = useState([]);

  // The different activities are extracted from the activities array and stored in their respective const variable.
  const bloodpressureArray = props.activities.filter(
    activity => activity.id.split("_")[0] === "BloodPressureReading"
  );
  const runningArray = props.activities.filter(
    activity => activity.id.split("_")[0] === "Running"
  );
  const weightArray = props.activities.filter(
    activity => activity.id.split("_")[0] === "WeightReading"
  );
  const cyclingArray = props.activities.filter(
    activity => activity.id.split("_")[0] === "Cycling"
  );
  const walkingArray = props.activities.filter(
    activity => activity.id.split("_")[0] === "Walking"
  );
  // The blood pressure array is mapped over to extract the diastolic and systolic pressure readings
  const bloodpressure = bloodpressureArray.map(reading => {
    return [reading.diastolicPressure, reading.systolicPressure];
  });
  // The reading times are extracted and stored in an array to be used when the blood pressure readings are to be displayed in a graph.
  const bloodpressureTimes = bloodpressureArray.map(reading =>
    new Date(reading.timestamp).toLocaleTimeString()
  );

  const weight = weightArray.map(reading => reading.weight);
  const running = runningArray.map(reading => reading.distance);
  const cycling = cyclingArray.map(reading => reading.distance);
  const walking = walkingArray.map(reading => reading.distance);
  const diastolicPressure = bloodpressure.map(diastolicP => diastolicP[0]);
  const systolicPressure = bloodpressure.map(systolicP => systolicP[1]);

  const avgDiastolicPressure =
    diastolicPressure.length !== 0
      ? diastolicPressure.reduce((a, b) => a + b, 0) / diastolicPressure.length
      : 0;
  const avgSystolicPressure =
    systolicPressure.length !== 0
      ? systolicPressure.reduce((a, b) => a + b, 0) / systolicPressure.length
      : 0;

  const avgWeight =
    weight.length !== 0 ? weight.reduce((a, b) => a + b, 0) / weight.length : 0;

  let totalDistance =
    running.length !== 0 ? running.reduce((a, b) => a + b, 0) : 0;

  totalDistance +=
    cycling.length !== 0 ? cycling.reduce((a, b) => a + b, 0) : 0;

  totalDistance +=
    walking.length !== 0 ? walking.reduce((a, b) => a + b, 0) : 0;
  const age = calculateAge(new Date(props.activities[0].patient.dob));

  const totalBloodPressure = bloodpressure.map(val =>
    val.reduce((a, b) => a + b)
  );

  const highestBloodPressureIndex = totalBloodPressure.indexOf(
    Math.max(...totalBloodPressure)
  );

  const lowestBloodPressureIndex = totalBloodPressure.indexOf(
    Math.min(...totalBloodPressure)
  );

  fetch(
    `/predict/${age}/${props.activities[0].patient.gender}/${avgWeight}/${avgDiastolicPressure}/${avgSystolicPressure}/${totalDistance}`
  )
    .then(res => res.json())
    .then(data => {
      setPredictions(data.result);
    });

  // 'data' is used for displaying the line graph
  let data = {
    labels: bloodpressureTimes.reverse(),
    datasets: [
      {
        label: "Diastolic Pressure",
        data: diastolicPressure.reverse(),
        backgroundColor: "rgba(255, 99, 132, 0.6)"
      },
      {
        label: "Systolic Pressure",
        data: systolicPressure.reverse(),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };
  return (
    // A line graph is rendered here, showing info about the patient's blood pressure readings
    <div>
      <IonCard>
        <IonCardContent className="line-graph">
          <Line data={data} />
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader className="predicted-data-value">
          {predictions.length !== 0 ? (
            <IonLabel>
              {bloodpressureArray.length !== 0
                ? "This patient is predicted to have a " +
                  predictions +
                  " chance of developing coronary heart disease"
                : "No blood pressure readings were recorded."}
            </IonLabel>
          ) : (
            <IonLabel>Predicting data...</IonLabel>
          )}
        </IonCardHeader>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Average bloodpressure reading</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <Container>
            <IonRow>
              <IonLabel className="avg-diatolic-pressure">
                Average Diastolic Pressure: {avgDiastolicPressure}mmhg
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="avg-systolic-pressure">
                Average Systolic Pressure: {avgSystolicPressure}mmhg
              </IonLabel>
            </IonRow>
          </Container>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Highest bloodpressure reading</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <Container>
            <IonRow>
              <IonLabel className="high-diatolic-pressure">
                Diastolic Pressure:{" "}
                {highestBloodPressureIndex === -1
                  ? "0mmhg"
                  : bloodpressure[highestBloodPressureIndex][0] + "mmgh"}
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="high-systolic-pressure">
                Systolic Pressure:{" "}
                {highestBloodPressureIndex === -1
                  ? "0mmhg"
                  : bloodpressure[highestBloodPressureIndex][1] + "mmgh"}
              </IonLabel>
            </IonRow>
          </Container>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Lowest bloodpressure reading</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <Container>
            <IonRow>
              <IonLabel className="low-diatolic-pressure">
                Diastolic Pressure:{" "}
                {lowestBloodPressureIndex === -1
                  ? "0mmhg"
                  : bloodpressure[lowestBloodPressureIndex][0] + "mmgh"}
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="low-systolic-pressure">
                Systolic Pressure:{" "}
                {lowestBloodPressureIndex === -1
                  ? "0mmhg"
                  : bloodpressure[lowestBloodPressureIndex][1] + "mmgh"}
              </IonLabel>
            </IonRow>
          </Container>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default RenderPredictions;
