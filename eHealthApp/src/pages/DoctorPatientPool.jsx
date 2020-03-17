/*
Add description

Author: Andy Le
*/

import React, { Fragment, useEffect, useState } from "react";
import {
  IonAlert,
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonToast
} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import UserQueries from "../queries/UserQueries";
import { Row, Container } from "react-bootstrap";
import { withRouter } from "react-router";

/*props:
 */
const DoctorPatientPool = props => {
  const doctor = props.match.params.docid;

  const [isSelectPromptOpen, setIsSelectPromptOpen] = useState(false);
  const [isExitPromptOpen, setIsExitPromptOpen] = useState(false);
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});

  useEffect(() => {
    UserQueries.getAllUnassignedPatients(doctor).then(res => {
      if (res.length < 1) setIsExitPromptOpen(true);
      else setPatients(res);
    });
  }, []);

  console.log(props);

  const onPatientClick = patient => {
    setSelectedPatient(patient);
    setIsSelectPromptOpen(true);
  };

  const onAssignmentComplete = () => {
    setIsToastDisplayed(true);
    //
    setTimeout(() => props.history.goBack(), 500);
  };

  const assignPatientToDoctor = () => {
    UserQueries.assignPatientToDoctor(doctor, selectedPatient.id)
      .then(() =>
        UserQueries.assignDoctorToPatient(selectedPatient.id, doctor)
          .then(() => onAssignmentComplete())
          .catch(() => console.log("Association failed."))
      )
      .catch(() => console.log("Association failed."));
  };

  const DoctorPatientPool = data => {
    return (
      <IonCard button={true} onClick={() => onPatientClick(data.patient)}>
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
      <BackButtonToolbar title={"Assign new Patient"} />
      <IonAlert
        isOpen={isSelectPromptOpen}
        onDidDismiss={() => setIsSelectPromptOpen(false)}
        header="Assign this Patient?"
        message={`Do you wish to take charge of ${selectedPatient.name}?`}
        buttons={[
          {
            text: "Yes",
            handler: () => assignPatientToDoctor()
          },
          {
            text: "No"
          }
        ]}
      />
      <IonAlert
        isOpen={isExitPromptOpen}
        onDidDismiss={() => props.history.goBack()}
        header="No patients found."
        message="Please try again later once there are available patients."
        buttons={["OK"]}
      />
      <IonToast
        isOpen={isToastDisplayed}
        onDidDismiss={() => setIsToastDisplayed(false)}
        message={`You are now in charge of ${selectedPatient.name}.`}
        duration={2000}
      />
      <IonContent className="ion-padding">
        {doctor && (
          <Fragment>
            {patients.length !== 0 &&
              patients.map((patient, index) => (
                <DoctorPatientPool key={index} patient={patient} />
              ))}
          </Fragment>
        )}
      </IonContent>
    </IonPage>
  );
};

export default withRouter(DoctorPatientPool);
