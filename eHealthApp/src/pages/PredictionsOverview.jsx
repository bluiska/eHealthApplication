/*

Author: Daniel Madu
*/

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
import { Container } from "react-bootstrap";
import { Pie, Line } from "react-chartjs-2";
import RenderPredictions from "./RenderPredictions";

const PredictionsOverview = props => {
  const activities = props.activities[1] ? props.activities[1] : [];

  /*
    This function checks if the activities array is empty. If it is empty, then it means that no activities were passed to the component
    and an Ioncard with a suitable message is displayed. If the activities array is not empty, then it renders the predictions to the screen
  */
  return (
    <IonPage>
      <IonContent>
        {activities && activities.length === 0 && (
          <IonCard>
            <IonCardHeader>
              <IonLabel
                style={{
                  textAlign: "center",
                  fontSize: "1.2em"
                }}
                className="nodata"
              >
                No data recorded
              </IonLabel>
            </IonCardHeader>
          </IonCard>
        )}
        {activities && activities.length !== 0 && activities[0] && (
          <RenderPredictions
            activities={activities}
            className="renderPredictions"
          />
        )}
      </IonContent>
      <IonFooter>
        <IonButton
          size="large"
          expand="block"
          onClick={() => props.setDisplayPredictions(false)}
          className="closebutton"
        >
          <IonTitle>Close</IonTitle>
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default PredictionsOverview;
