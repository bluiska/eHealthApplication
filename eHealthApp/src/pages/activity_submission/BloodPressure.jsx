import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonText,
  IonInput
} from "@ionic/react";
import FooterSubmitButton from "../../components/FooterSubmitButton";
import BackButtonToolbar from "../../components/BackButtonToolbar";
import BackendAccess from "../../utilities/BackendAccess";
import ActivityQueries from "./../../queries/ActivityQueries";
import { withRouter } from "react-router-dom";
import ActivitySubmissionPage from "./ActivitySubmissionPage";

const BloodPressure = props => {
  const styles = {
    label: {
      fontSize: "1.3em"
    },
    star: {
      fontSize: "1.4em"
    }
  };

  const [diastolicPressure, setDiastolicPressure] = useState(0);
  const [systolicPressure, setSystolicPressure] = useState(0);

  return (
    <ActivitySubmissionPage
      submissionType="measurement"
      measurementType="BloodPressureReadings"
      submitData={{
        diastolicPressure: diastolicPressure,
        systolicPressure: systolicPressure
      }}
      title="Blood pressure entry"
      patientId={props.match.params.patientid}
      successMessage="Your blood pressure reading has been submitted successfully."
      failMessage="Your blood pressure reading could not be submitted."
    >
      <IonItem style={{ marginTop: "-20px" }}>
        <IonLabel style={styles.label} position="stacked">
          Systolic Pressure{" "}
          <IonText style={styles.star} color="danger">
            *
          </IonText>
        </IonLabel>
        <IonInput
          type="number"
          placeholder="Enter the systolic pressure reading"
          clearInput
          onIonChange={e => setSystolicPressure(e.detail.value)}
        />
      </IonItem>
      <IonItem>
        <IonLabel style={styles.label} position="stacked">
          Diastolic Pressure{" "}
          <IonText style={styles.star} color="danger">
            *
          </IonText>
        </IonLabel>
        <IonInput
          type="number"
          placeholder="Enter the diastolic pressure reading"
          clearInput
          onIonChange={e => setDiastolicPressure(e.detail.value)}
        />
      </IonItem>
    </ActivitySubmissionPage>
  );
};

export default withRouter(BloodPressure);
