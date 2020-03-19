import React, { useState } from "react";
import { IonPage, IonContent, IonAlert } from "@ionic/react";
import { withRouter } from "react-router-dom";

import ActivityQueries from "./../../queries/ActivityQueries";
import BackButtonToolbar from "../../components/BackButtonToolbar";
import FooterSubmitButton from "./../../components/FooterSubmitButton";
import { firebaseInstance } from "./../../components/firebase/firebase";
import moment from "moment";

const ActivitySubmissionPage = props => {
	const [showSubmitAlert, setShowSubmitAlert] = useState(false);
	const [submitAlertContent, setSubmitAlertContent] = useState(false);
	const HEADER = {
		SUCCESS: "Submission successful.",
		FAIL: "Submission failed!"
	};

	/**
	 * Submit the measurement data.
	 * Uses the submitData prop to submit the data added by components that use this component
	 * It also sets the alert message based on a successful upload
	 */
	const submitActivity = () => {
		ActivityQueries.uploadNewActivity(props.patientId, props.submitData)
			.then(() => {
				setSubmitAlertContent({
					header: HEADER.SUCCESS,
					message: props.successMessage
				});
				setShowSubmitAlert(true);
			})
			.catch(() => {
				setSubmitAlertContent({
					header: HEADER.FAIL,
					message: props.failMessage
				});
				setShowSubmitAlert(true);
			});
	};

	return (
		<IonPage>
			<IonAlert
				isOpen={showSubmitAlert}
				onDidDismiss={() => {
					setShowSubmitAlert(false);
					submitAlertContent.header === HEADER.SUCCESS && props.history.goBack();
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
						console.log("submitting");
						submitActivity();
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
