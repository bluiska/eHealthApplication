/*
The page displaying the activities of a user for today.
This page allows the user to trigger synchronization as well as
add health data manually.

Author: Gergo Kekesi
*/

import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonItem,
  IonImg,
  IonList,
  IonSpinner
} from "@ionic/react";

import { sync, add } from "ionicons/icons";
import pencil from "../resources/pencil.png";
import "./Today.css";
import BackButtonToolbar from "../components/BackButtonToolbar";
import { withRouter } from "react-router-dom";
import ActivityQueries from "../queries/ActivityQueries";
import RecordCard from "../components/record_cards/RecordCard";
import { Container, Row, Col } from "react-bootstrap";
import BluetoothSynchronisationManager from "../bluetooth/managers/BluetoothSynchronisationManager";

/*props:
 */
const Today = props => {
  const [todaysActivities, setTodaysActivities] = useState([]);
  const [newDataAvailable, setNewDataAvailable] = useState(true);
  const patientId = props.match.params.patientid || "unknown";

  useEffect(() => {
    setInterval(() => {
      if (newDataAvailable) {
        getActivities();
      }
    }, 1000);
  }, [newDataAvailable]);

  useEffect(() => {
    setInterval(() => {
      checkForNewData();
    }, 1000);
  }, []);

  const checkForNewData = () => {
    const dataAvailable = BluetoothSynchronisationManager.isNewDataAvailable();
    if (newDataAvailable !== dataAvailable) {
      setNewDataAvailable(dataAvailable);
    }
  };

  const getActivities = () => {
    const todayDate = new Date();
    const formatedDate = new Date(todayDate.setDate(todayDate.getDate()))
      .toISOString()
      .slice(0, 10);

    ActivityQueries.getActivitiesByDateRange(
      patientId,
      formatedDate,
      formatedDate
    ).then(async res => {
      if (res.length > 0) {
        const sortArray = arr => arr.sort((a, b) => b.endTime - a.endTime);
        const sortedArray = await sortArray(res);
        setTodaysActivities(sortedArray);
      }
    });
  };

  return (
    <IonPage>
      <BackButtonToolbar title="Today: Activities" />
      <IonContent className="ion-padding">
        {/*Activity*/}
        <IonItem>
          <IonList>
            {todaysActivities.length === 0 ? (
              <div style={{ alignContent: "center", justifyContent: "center" }}>
                <IonSpinner />
              </div>
            ) : (
              todaysActivities.map(activity => {
                return (
                  <RecordCard
                    key={activity.id}
                    index={activity.id}
                    data={activity}
                  />
                );
              })
            )}
          </IonList>
        </IonItem>

        {/*Floating action button*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="secondary">
            <IonIcon icon={add} />
          </IonFabButton>

          <IonFabList side="top">
            <IonFabButton
              color="tertiary"
              routerDirection="forward"
              routerLink="/devices"
              data-desc="Synchronize"
            >
              <IonIcon icon={sync} />
            </IonFabButton>
            <IonFabButton
              color="tertiary"
              routerDirection="forward"
              routerLink={"/manualentry/patient/" + patientId}
              data-desc="Manual entry"
            >
              <IonImg src={pencil} style={{ width: "20px", height: "20px" }} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Today);
