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
      { id: "Patient-1234", name: "Daniel" },
      { id: "Patient-1234", name: "Irek" },
      { id: "Patient-1234", name: "Andy" },
      { id: "Patient-1234", name: "Greg" },
      { id: "Patient-1234", name: "Daniel2" },
      { id: "Patient-1234", name: "Irek2" },
      { id: "Patient-1234", name: "Andy2" },
      { id: "Patient-1234", name: "Greg2" }
    ]
  },
  {
    name: "Dr. Irek",
    ID: "Doctor-5678",
    patients: [
      { id: "Patient-5678", name: "Sergio" },
      { id: "Patient-5678", name: "Chris" },
      { id: "Patient-5678", name: "Margory" },
      { id: "Patient-5678", name: "Basu" }
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
          <p>Patient Id: {data.patient.id}</p>
        </IonCardContent>
      </IonCard>
    );
  };

  return (
    <IonPage>
      {console.log("Rendered!")}
      <BackButtonToolbar title={"Patients"} />
      <IonContent className="ion-padding">
        {doctor && (
          <Fragment>
            <h2>Assigned Patients</h2>
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
