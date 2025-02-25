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
  IonLabel
} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import UserQueries from "../queries/UserQueries";
import { Row, Container } from "react-bootstrap";
import Patient from "../components/Patient";

/*props:
 */
const Patients = props => {
  const doctor = props.match.params.docid;

  const [patients, setPatients] = useState([]);

  /**
   * When the patients screen loads, all the available patients for that doctor
   * are retrieved and stored in the state.
   */
  useEffect(() => {
    UserQueries.getDoctorById(doctor).then(res => {
      setPatients(res);
    });
  }, []);

  return (
    <IonPage>
      <BackButtonToolbar title={"Assigned Patients"} />
      <IonContent className="ion-padding">
        {doctor && (
          <Fragment>
            {patients.length !== 0 &&
              patients.map((patient, index) => (
                <Patient key={index} patient={patient} doctor={doctor} />
              ))}
            {patients.length === 0 && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>No patients assigned</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>
                    You currently do not have any assigned patients
                  </IonLabel>
                </IonCardContent>
              </IonCard>
            )}
          </Fragment>
        )}
        {/* {console.log("PROPS:", props)} */}
      </IonContent>
    </IonPage>
  );
};

export default Patients;
