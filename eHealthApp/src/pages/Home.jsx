/*
The applications home page rendered by default when the root URL is visited.
This page allows navigation to the pages that complete the Assignment's tasks.

Author: Gergo Kekesi
*/

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import background_image from "../resources/home_background_blur.jpg";

import "./Home.css";

/*props:
 */
const Home = () => {
  const styles = {
    home: {
      width: "100%",
      height: "100%",
      backgroundImage: `url(${background_image})`,
      backgroundSize: "cover"
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>eHealth Application</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding" style={styles.home}>
          <Container>
            <Row>
              <Col>
                <IonButton
                  size="large"
                  expand="block"
                  style={{ marginBottom: "30px" }}
                  routerDirection="forward"
                  routerLink={"/today"}
                >
                  Today's Activity
                </IonButton>
              </Col>
            </Row>
            <Row>
              <Col>
                <IonButton
                  size="large"
                  expand="block"
                  routerDirection="forward"
                  routerLink={"/patients"}
                >
                  View Patients
                </IonButton>
              </Col>
            </Row>
            <Row></Row>
          </Container>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
