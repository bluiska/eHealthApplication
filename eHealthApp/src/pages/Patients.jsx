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
          </Fragment>
        )}
        {/* {console.log("PROPS:", props)} */}
      </IonContent>
    </IonPage>
  );
};

export default Patients;
