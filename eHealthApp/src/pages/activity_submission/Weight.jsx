import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonListHeader,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonFooter
} from "@ionic/react";
import BackButtonToolbar from "../../components/BackButtonToolbar";
import { Container, Row, Col } from "react-bootstrap";
import FooterSubmitButton from "../../components/FooterSubmitButton";
import ActivitySubmissionPage from "./ActivitySubmissionPage";
import { withRouter } from "react-router-dom";

const Weight = props => {
  const [weight, setWeight] = useState(0);
  const [measurementUnit, setMeasurementUnit] = useState("kg");

  const convertWeight = weight => {
    switch (measurementUnit) {
      case "kg":
        return weight;
      case "pounds":
        return weight / 2.205;
      case "stones":
        return weight * 6.35;
      default:
        return weight;
    }
  };

  return (
    <ActivitySubmissionPage
      submissionType="measurement"
      measurementType="WeightReadings"
      submitData={{ weight: weight }}
      title="Weight entry"
      patientId={props.match.params.patientid}
      successMessage="Your weight measurement has been submitted successfully."
      failMessage="Your weight measurement could not be submitted."
    >
      <IonItem>
        <IonLabel position="stacked">
          Weight <IonText color="danger">*</IonText>
        </IonLabel>
        <IonInput
          type="number"
          placeholder="Enter your weight"
          clearInput
          onIonChange={e => {
            setWeight(convertWeight(parseFloat(e.detail.value)));
          }}
        />
      </IonItem>
      <IonRadioGroup
        value={measurementUnit}
        onIonChange={e => {
          setMeasurementUnit(e.detail.value);
        }}
      >
        <IonListHeader>
          <IonLabel>Measurement Type</IonLabel>
        </IonListHeader>

        <Container>
          <Row>
            <Col style={{ padding: "0px" }}>
              <IonItem style={{ borderRadius: "15px" }}>
                <IonLabel>Kg</IonLabel>
                <IonRadio value="kg" color="tertiary" checked="true" />
              </IonItem>
            </Col>
            <Col style={{ padding: "0px" }}>
              <IonItem style={{ borderRadius: "15px" }}>
                <IonLabel>Stones</IonLabel>
                <IonRadio value="stones" color="tertiary" />
              </IonItem>
            </Col>
            <Col style={{ padding: "0px" }}>
              <IonItem style={{ borderRadius: "15px" }}>
                <IonLabel>Pounds</IonLabel>
                <IonRadio value="pounds" color="tertiary" />
              </IonItem>
            </Col>
          </Row>
        </Container>
      </IonRadioGroup>
    </ActivitySubmissionPage>
  );
};

export default withRouter(Weight);
