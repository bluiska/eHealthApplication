import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel
} from "@ionic/react";
import { Container, Row } from "react-bootstrap";

const Patient = props => {
  //   console.log("PROPS PATIENT:", props.patient);
  return (
    <IonCard
      routerDirection="forward"
      routerLink={`/patientoverview/doctor/${props.doctor}/patient/${props.patient.id}/${props.patient.name}`}
    >
      <IonCardHeader>
        <IonCardTitle className="patient-name">
          {props.patient.name}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <Container>
          <Row>
            <IonLabel className="patient-id">
              Patient id: {props.patient.id}
            </IonLabel>
          </Row>
          <Row>
            <IonLabel className="patient-gender">
              Gender: {props.patient.gender}
            </IonLabel>
          </Row>
          <Row>
            <IonLabel className="patient-dob">
              Date of birth: {new Date(props.patient.dob).toDateString()}
            </IonLabel>
          </Row>
          <Row>
            <IonLabel className="patient-email">
              Email: {props.patient.email}
            </IonLabel>
          </Row>
        </Container>
      </IonCardContent>
    </IonCard>
  );
};

export default Patient;
