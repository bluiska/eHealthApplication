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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg
} from "@ionic/react";

import { sync, add } from "ionicons/icons";
import pencil from "../resources/pencil.png";
import "./Today.css";
import BackButtonToolbar from "../components/BackButtonToolbar";
import { withRouter } from "react-router-dom";
import ActivityQueries from "../queries/ActivityQueries";
import ActivityComponent from "../components/ActivityComponent";
import { Container, Row, Col } from "react-bootstrap";

/*props:
 */
const Today = props => {
  const [todaysActivities, setTodaysActivities] = useState([]);
  const patientId = props.match.params.patientid || "unknown";

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = () => {
    const todayDate = new Date();
    const formatedDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
      .toISOString()
      .slice(0, 10);
    const addLeadingZero = num => String(num).padStart(2, "0");

    ActivityQueries.getActivitiesByDateRange(
      patientId,
      formatedDate,
      formatedDate
    ).then(res => {
      if (res.length > 0) {
        const activities = [];
        res.map(activity => {
          activity.id = activity.id.split("_")[0];
          const date = activity.startTime.slice(0, 10);
          activity.startTime = `${new Date(date).getDate()} ${addLeadingZero(
            new Date(date).getMonth() + 1
          )} ${new Date(date).getFullYear()}`;
          console.log(activity);
          activities.push(extractActivities(activity))
        });
        setTodaysActivities(activities);
      }
    });
  };

  const extractActivities = activity => {
    switch (activity.id.toLowerCase()) {
      case "cycling": {
        return (
          <ActivityComponent type={activity.id}>
            <Container>
            <Row>
                <Col>Recorded:</Col>
                <Col>Distance:</Col>
                <Col>Calories Burnt:</Col>
              </Row>
              <Row>
                <Col>{activity.startTime}</Col>
                <Col>{activity.distance}</Col>
                <Col>{activity.caloriesBurnt}</Col>
              </Row>
            </Container>
          </ActivityComponent>
        );
      }
      default:
        break;
    }
  };

  return (
    <IonPage>
      <BackButtonToolbar title="Today: Activities" />
      <IonContent className="ion-padding">
        {/*Activity*/}
        {
          todaysActivities.length === 0 ? (
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
          ) : todaysActivities.map(activity => activity)
        }

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
