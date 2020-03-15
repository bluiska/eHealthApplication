import React, { useState } from "react";
import { IonInput, IonItem, IonLabel, IonText, IonDatetime, IonRadioGroup, IonListHeader, IonRadio, IonIcon } from "@ionic/react";
import { Container, Row, Col } from "react-bootstrap";
import ActivitySubmissionPage from "./ActivitySubmissionPage";
import { warning } from "ionicons/icons";
import { Collapse } from "react-bootstrap";

const Exercise = props => {
	const [submitData, setSubmitData] = useState({ timestamp: null, startTime: null, endTime: null, distance: null });
	const [distance, setDistance] = useState(null);
	const [distanceUnit, setDistanceUnit] = useState("km");
	const [maxDateTime, setMaxDateTime] = useState(new Date());
	const [validation, setValidation] = useState({ distanceError: false });
	const [validationMessage, setValidationMessage] = useState({
		distanceError: ""
	});

	const styles = {
		label: {
			fontSize: "1.3em",
			paddingLeft: "0px"
		},
		star: {
			fontSize: "1.4em"
		},
		warningIcon: { width: "30px", height: "30px", marginBottom: "-7px" }
	};

	const exerciseType = props.match.params.type;

	const getType = type => {
		switch (type) {
			case "walk":
				return { title: "Walk", activity: "walked", entityType: "Walkings" };
			case "run":
				return { title: "Run", activity: "ran", entityType: "Runnings" };
			case "cycle":
				return { title: "Cycle", activity: "cycled", entityType: "Cyclings" };
			default:
				return "";
		}
	};

	const updateData = (key, value) => {
		let newData = JSON.parse(JSON.stringify(submitData));
		newData[key] = value;
		setSubmitData(newData);
	};

	const getDistance = (distance, unit) => {
		switch (unit) {
			case "km":
				return distance;
			case "miles":
				return distance * 1.609;
			default:
				return distance;
		}
	};

	return (
		<ActivitySubmissionPage
			title={`Exercise: ${getType(exerciseType).title}`}
			submissionType="exercise"
			measurementType={getType(exerciseType).entityType}
			submitData={submitData}
			validated={
				Object.keys(submitData).filter(v => {
					return !submitData[v];
				}).length === 0
			}
			validateErrorMessage={"Please ensure all required fields have been provided without errors."}
			patientId={props.match.params.patientid}
			successMessage={`Your ${getType(exerciseType).title.toLowerCase()} has been submitted successfully.`}
			failMessage={`Your ${getType(exerciseType).title.toLowerCase()} could not be submitted.`}>
			<IonItem>
				{console.log(submitData)}
				<IonLabel>
					Date{" "}
					<IonText style={styles.star} color="danger">
						*
					</IonText>
				</IonLabel>
				<IonDatetime
					placeholder="Select date"
					min={new Date("2020-01-01").toISOString()}
					max={maxDateTime}
					onIonFocus={() => {
						setMaxDateTime(new Date().toISOString());
					}}
					onIonBlur={() => {
						setMaxDateTime(new Date().toISOString());
					}}
					onIonChange={e => {
						let isoDate = new Date(e.detail.value).toISOString();
						if (isoDate.length > 0) {
							updateData("timestamp", isoDate);
						}
					}}
				/>
			</IonItem>
			<IonItem>
				<IonLabel>
					Start Time{" "}
					<IonText style={styles.star} color="danger">
						*
					</IonText>
				</IonLabel>
				<IonDatetime
					display-format="HH:mm"
					picker-format="HH:mm"
					placeholder="Select start time"
					min={new Date("2020-01-01").toISOString()}
					max={maxDateTime}
					onIonFocus={() => {
						setMaxDateTime(new Date().toISOString());
					}}
					onIonBlur={() => {
						setMaxDateTime(new Date().toISOString());
					}}
					onIonChange={e => {
						let isoDate = new Date(e.detail.value).toISOString();
						if (isoDate.length > 0) {
							updateData("startTime", isoDate);
						}
					}}
				/>
			</IonItem>
			<IonItem>
				<IonLabel>
					End Time{" "}
					<IonText style={styles.star} color="danger">
						*
					</IonText>
				</IonLabel>
				<IonDatetime
					display-format="HH:mm"
					picker-format="HH:mm"
					placeholder="Select end time"
					min={new Date("2020-01-01").toISOString()}
					max={maxDateTime}
					onIonFocus={() => {
						setMaxDateTime(new Date().toISOString());
					}}
					onIonBlur={() => {
						setMaxDateTime(new Date().toISOString());
					}}
					onIonChange={e => {
						let isoDate = new Date(e.detail.value).toISOString();
						if (isoDate.length > 0) {
							updateData("endTime", isoDate);
						}
					}}></IonDatetime>
			</IonItem>
			<IonItem style={{ marginTop: validation.distanceError ? "-8px" : "-20px" }}>
				<Container>
					<Row style={{ padding: "0px" }}>
						<Col style={{ padding: "0px" }}>
							<IonLabel style={styles.label} position="stacked">
								Distance{" "}
								{validation.distanceError ? (
									<IonIcon icon={warning} style={styles.warningIcon} />
								) : (
									<IonText style={styles.star} color="danger">
										*
									</IonText>
								)}
							</IonLabel>
							<IonInput
								className="ion-no-padding ion-padding-vertical"
								type="number"
								placeholder={`Enter the distance ${getType(exerciseType).activity}`}
								clearInput
								onIonChange={e => {
									if (e.detail.value <= 10000 && e.detail.value > 0) {
										setDistance(parseFloat(e.detail.value));
										updateData("distance", getDistance(parseFloat(e.detail.value), distanceUnit));
										let val = { ...validation, distanceError: false };
										setValidation(val);
									} else {
										setDistance(null);
										updateData("distance", null, distanceUnit);
										if (e.detail.value) {
											let val = { ...validation, distanceError: true };
											setValidation(val);
											let valMsg = {
												...validationMessage,
												distanceError: e.detail.value > 10000 ? "The value is too high" : "The value is too low."
											};
											setValidationMessage(valMsg);
										} else {
											let val = { ...validation, distanceError: false };
											setValidation(val);
											let valMsg = {
												...validationMessage,
												distanceError: ""
											};
											setValidationMessage(valMsg);
										}
									}
								}}
							/>
							<Collapse in={validation.distanceError}>
								<IonText style={{ color: "maroon" }}>{validationMessage.distanceError}</IonText>
							</Collapse>
						</Col>
					</Row>

					<Row style={{ padding: "0px" }}>
						<Col style={{ padding: "0px" }}>
							<IonRadioGroup
								onIonChange={e => {
									setDistanceUnit(e.detail.value);
									updateData("distance", getDistance(distance, e.detail.value));
								}}>
								<IonListHeader className="ion-no-padding">
									<IonLabel>Measurement Type</IonLabel>
								</IonListHeader>

								<Row>
									<Col>
										<IonItem style={{ borderRadius: "15px" }}>
											<IonLabel>Km</IonLabel>
											<IonRadio value="km" color="tertiary" slot="end" />
										</IonItem>
									</Col>
									<Col>
										<IonItem style={{ borderRadius: "15px" }}>
											<IonLabel>Miles</IonLabel>
											<IonRadio value="miles" color="tertiary" slot="end" />
										</IonItem>
									</Col>
								</Row>
							</IonRadioGroup>
						</Col>
					</Row>
				</Container>
			</IonItem>
		</ActivitySubmissionPage>
	);
};

export default Exercise;
