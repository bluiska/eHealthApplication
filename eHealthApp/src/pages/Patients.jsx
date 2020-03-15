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
  IonCardTitle
} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import UserQueries from "../queries/UserQueries";

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

  const Patient = data => {
    return (
      <IonCard
        routerDirection="forward"
        routerLink={`/patientoverview/doctor/${doctor}/patient/${data.patient.id}/${data.patient.name}`}
      >
        <IonCardHeader>
          <IonCardTitle>{data.patient.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Patient id: {data.patient.id}</p>
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
                <Patient key={index} patient={patient} />
              ))}
          </Fragment>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Patients;
