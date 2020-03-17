/*
Add description

Author: Daniel Madu
*/

import React, { Fragment, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import { add } from "ionicons/icons";
import BackButtonToolbar from "../components/BackButtonToolbar";
import UserQueries from "../queries/UserQueries";
import { Row, Container } from "react-bootstrap";

/*props:
 */
const DoctorPatients = props => {
  const doctor = props.match.params.docid;

  const [patients, setPatients] = useState([]);
  const [isDemo] = useState(doctor.includes("Test"));

  useEffect(() => {
    UserQueries.getPatientsByDoctorId(doctor).then(res => {
      setPatients(res);
    });
  }, []);

  const DoctorPatients = data => {
    return (
      <IonCard
        routerDirection="forward"
        routerLink={`/doctor/${doctor}/mypatients-manage/${data.patient.id}/${data.patient.name}`}
      >
        <IonCardHeader>
          <IonCardTitle>{data.patient.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <Container>
            <Row>
              <IonLabel>Patient ID: {data.patient.id}</IonLabel>
            </Row>
            <Row>
              <IonLabel>Gender: {data.patient.gender}</IonLabel>
            </Row>
            <Row>
              <IonLabel>
                Date of Birth: {new Date(data.patient.dob).toDateString()}
              </IonLabel>
            </Row>
            <Row>
              <IonLabel>Email: {data.patient.email}</IonLabel>
            </Row>
          </Container>
        </IonCardContent>
      </IonCard>
    );
  };

  return (
    <IonPage>
      <BackButtonToolbar title={"Assigned Patients"} />
      <IonContent className="ion-padding">
        {doctor && (
          <Fragment>
            {patients.length !== 0 &&
              patients.map((patient, index) => (
                <DoctorPatients key={index} patient={patient} />
              ))}
          </Fragment>
        )}
        {/*Floating action button*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            disabled={isDemo}
            color="secondary"
            routerDirection="forward"
            routerLink={`/doctor/${doctor}/mypatients-add`}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default DoctorPatients;
