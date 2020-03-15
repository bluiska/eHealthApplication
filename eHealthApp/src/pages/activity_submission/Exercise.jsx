import React, { useState } from "react";
import { IonInput, IonItem, IonLabel, IonText, IonDatetime, IonRadioGroup, IonListHeader, IonRadio } from "@ionic/react";
import { Container, Row, Col } from "react-bootstrap";
import ActivitySubmissionPage from "./ActivitySubmissionPage";

const Exercise = props => {
	const [submitData, setSubmitData] = useState({ distance: 0 });
	const [distance, setDistance] = useState(0);
	const [distanceUnit, setDistanceUnit] = useState("km");

	const styles = {
		label: {
			fontSize: "1.3em",
			paddingLeft: "0px"
		},
		star: {
			fontSize: "1.4em"
		}
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
				return distance / 1.609;
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
					display-format="h:mm A"
					picker-format="h:mm A"
					placeholder="Select start time"
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
					display-format="h:mm A"
					picker-format="h:mm A"
					placeholder="Select end time"
					onIonChange={e => {
						let isoDate = new Date(e.detail.value).toISOString();
						if (isoDate.length > 0) {
							updateData("endTime", isoDate);
						}
					}}></IonDatetime>
			</IonItem>
			<IonItem>
				<Container>
					<Row style={{ padding: "0px" }}>
						<Col style={{ padding: "0px" }}>
							<IonLabel style={styles.label} position="stacked">
								Distance{" "}
								<IonText style={styles.star} color="danger">
									*
								</IonText>
							</IonLabel>
							<IonInput
								className="ion-no-padding ion-padding-vertical"
								type="number"
								placeholder={`Enter the distance ${getType(exerciseType).activity}`}
								clearInput
								onIonChange={e => {
									setDistance(parseFloat(e.detail.value));
									updateData("distance", getDistance(parseFloat(e.detail.value), distanceUnit));
								}}
							/>
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
