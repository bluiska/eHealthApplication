import React, { useState } from "react";
import { IonPage, IonContent, IonAlert } from "@ionic/react";
import BackButtonToolbar from "../../components/BackButtonToolbar";
import FooterSubmitButton from "./../../components/FooterSubmitButton";
import ActivityQueries from "./../../queries/ActivityQueries";
import { withRouter } from "react-router-dom";

const ActivitySubmissionPage = props => {
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [submitAlertContent, setSubmitAlertContent] = useState(false);
  const HEADER = {
    SUCCESS: "Submission successful.",
    FAIL: "Submission failed!"
  };
  return (
    <IonPage>
      <IonAlert
        isOpen={showSubmitAlert}
        onDidDismiss={() => {
          setShowSubmitAlert(false);
          submitAlertContent.header === HEADER.SUCCESS &&
            props.history.goBack();
        }}
        header={submitAlertContent.header}
        message={submitAlertContent.message}
        buttons={["OK"]}
      />
      <BackButtonToolbar title={props.title} />
      <IonContent className="ion-padding">{props.children}</IonContent>
      <FooterSubmitButton
        onSubmit={() => {
          console.log(props.submitData);
          if (props.validated) {
            if (props.submissionType === "measurement") {
              ActivityQueries.uploadNewMeasurement(props.patientId, {
                type: props.measurementType,
                data: { ...props.submitData }
              })
                .then(res => {
                  if (res && res.ID && res.ID.length > 0) {
                    setSubmitAlertContent({
                      header: HEADER.SUCCESS,
                      message: props.successMessage
                    });
                  } else {
                    setSubmitAlertContent({
                      header: HEADER.FAIL,
                      message: props.failMessage
                    });
                  }
                  setShowSubmitAlert(true);
                })
                .catch(() => {
                  setSubmitAlertContent({
                    header: HEADER.FAIL,
                    message: props.failMessage
                  });
                  setShowSubmitAlert(true);
                });
            } else {
              ActivityQueries.uploadNewExercise(props.patientId, {
                type: props.measurementType,
                data: { ...props.submitData }
              }).then(res => {
                if (res && res.ID && res.ID.length > 0) {
                  setSubmitAlertContent({
                    header: "Submission successful.",
                    message: props.successMessage
                  });
                } else {
                  setSubmitAlertContent({
                    header: "Submission failed!",
                    message: props.failMessage
                  });
                }
                setShowSubmitAlert(true);
              });
            }
          } else {
            setSubmitAlertContent({
              header: HEADER.FAIL,
              message: props.validateErrorMessage
            });
            setShowSubmitAlert(true);
          }
        }}
      />
    </IonPage>
  );
};

export default withRouter(ActivitySubmissionPage);
