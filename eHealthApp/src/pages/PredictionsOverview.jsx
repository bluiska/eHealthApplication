import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonFooter,
  IonTitle
} from "@ionic/react";

const PredictionsOverview = props => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetch("/predict")
      .then(res => res.json())
      .then(data => {
        setPredictions(data.result);
        console.log(data.result);
      });
  }, []);

  return (
    <IonPage>
      <IonContent>{/* <div>{predictions}</div> */}</IonContent>
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
