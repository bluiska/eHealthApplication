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
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/react";

import { sync, add, today } from "ionicons/icons";
import pencil from "../resources/pencil.png";
import "./Today.css";
import BackButtonToolbar from "../components/BackButtonToolbar";
import { withRouter } from "react-router-dom";
import ActivityQueries from "../queries/ActivityQueries";
import RecordCard from "../components/record_cards/RecordCard";

/*props:
 */
const Today = props => {
  const [todaysActivities, setTodaysActivities] = useState([]);
  const patientId = props.match.params.patientid || "unknown";

  let activitiesComponent = <IonSpinner />;

  useEffect(() => {
    getActivities();
  }, []);

  const handleActivitiesComponentChange = () => {
    if (todaysActivities.length === 0) {
      return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>No activity today</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              No activity for today. Synchronize your devices or add an entry
              manually using the plus button below.
            </p>
          </IonCardContent>
        </IonCard>
      );
    } else if (todaysActivities.length > 0) {
      return (
        <IonItem>
          <IonList>
            {todaysActivities.map(activity => {
              return (
                <RecordCard
                  key={activity.id}
                  index={activity.id}
                  data={activity}
                />
              );
            })}
          </IonList>
        </IonItem>
      );
    } else {
      return activitiesComponent;
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
        const sortArray = arr =>
          arr.sort(
            (a, b) =>
              new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
          );
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
        {handleActivitiesComponentChange()}
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
