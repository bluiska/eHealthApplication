/*
Add description

Author: Daniel Madu
*/

import React, { Fragment } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";

var dummyData = [
  {
    name: "Dr. Daniel",
    ID: "Doctor-1234",
    patients: [
      { id: "Patient-1234", name: "Daniel", dob: "19/05/1998" },
      { id: "Patient-1234", name: "Irek", dob: "19/05/1998" },
      { id: "Patient-1234", name: "Andy", dob: "19/05/1998" },
      { id: "Patient-1234", name: "Greg", dob: "19/05/1998" },
      { id: "Patient-1234", name: "Daniel2", dob: "19/05/1998" },
      { id: "Patient-1234", name: "Irek2", dob: "19/05/1998" },
      { id: "Patient-1234", name: "Andy2", dob: "19/05/1998" },
      { id: "Patient-1234", name: "Greg2", dob: "19/05/1998" }
    ]
  },
  {
    name: "Dr. Irek",
    ID: "Doctor-5678",
    patients: [
      { id: "Patient-5678", name: "Sergio", dob: "19/05/1998" },
      { id: "Patient-5678", name: "Chris", dob: "19/05/1998" },
      { id: "Patient-5678", name: "Margory", dob: "19/05/1998" },
      { id: "Patient-5678", name: "Basu", dob: "19/05/1998" }
    ]
  }
];

/*props:
 */
const Patients = props => {
  const doctor = props.match.params.docid;

  const Patient = data => {
    return (
      <IonCard
        routerDirection="forward"
        routerLink={`/patientoverview/doctor/${doctor}/patient/${data.patient.id}`}
      >
        <IonCardHeader>
          <IonCardTitle>Patient's Name: {data.patient.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Date of birth: {data.patient.dob}</p>
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
            {dummyData
              .filter(doc => doc.name === doctor)
              .map((patients, i1) =>
                patients.patients.map((patient, i2) => (
                  <Patient key={i1 + i2} patient={patient} />
                ))
              )}
          </Fragment>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Patients;
