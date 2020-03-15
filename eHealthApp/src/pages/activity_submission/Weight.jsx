import React, { useState } from "react";
import { IonInput, IonItem, IonLabel, IonText, IonListHeader, IonRadioGroup, IonRadio, IonIcon } from "@ionic/react";
import { Container, Row, Col } from "react-bootstrap";
import ActivitySubmissionPage from "./ActivitySubmissionPage";
import { withRouter } from "react-router-dom";
import { warning } from "ionicons/icons";
import { Collapse } from "react-bootstrap";

const Weight = props => {
	const [weight, setWeight] = useState(0);
	const [measurementUnit, setMeasurementUnit] = useState("kg");
	const [validation, setValidation] = useState({ weightError: false });
	const [validationMessage, setValidationMessage] = useState({ weightError: "" });

	const styles = {
		label: {
			fontSize: "1.3em"
		},
		star: {
			fontSize: "1.4em"
		},
		warningIcon: { width: "30px", height: "30px", marginBottom: "-7px" }
	};

	const convertWeight = (weight, unit) => {
		switch (unit) {
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
			validated={weight != -1}
			validateErrorMessage={"Please ensure the weight to be submitted has been provided without errors."}
			successMessage="Your weight measurement has been submitted successfully."
			failMessage="Your weight measurement could not be submitted.">
			<IonItem style={{ marginTop: validation.weightError ? "-8px" : "-20px" }}>
				<IonLabel position="stacked" style={styles.label}>
					Weight{" "}
					{validation.weightError ? (
						<IonIcon icon={warning} style={styles.warningIcon} />
					) : (
						<IonText style={styles.star} color="danger">
							*
						</IonText>
					)}
				</IonLabel>
				<IonInput
					type="number"
					placeholder="Enter your weight"
					clearInput
					onIonChange={e => {
						if (e.detail.value <= 999 && e.detail.value >= 0) {
							setWeight(convertWeight(e.detail.value, measurementUnit));
							let val = { ...validation, weightError: false };
							setValidation(val);
						} else {
							setWeight(-1);
							let val = { ...validation, weightError: true };
							setValidation(val);
							let valMsg = {
								...validationMessage,
								weightError: e.detail.value > 999 ? "The value is too high" : "The value is too low."
							};
							setValidationMessage(valMsg);
						}
					}}
				/>
				<Collapse in={validation.weightError}>
					<IonText style={{ color: "maroon" }}>{validationMessage.weightError}</IonText>
				</Collapse>
			</IonItem>
			<IonRadioGroup
				value={measurementUnit}
				onIonChange={e => {
					setMeasurementUnit(e.detail.value);
					let newWeight = convertWeight(weight, e.detail.value);
					setWeight(newWeight);
				}}>
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
