import React, { useState } from "react";
import {
	IonPage,
	IonContent,
	IonInput,
	IonItem,
	IonLabel,
	IonText,
	IonDatetime,
	IonRadioGroup,
	IonListHeader,
	IonRadio
} from "@ionic/react";
import BackButtonToolbar from "../../components/BackButtonToolbar";
import FooterSubmitButton from "../../components/FooterSubmitButton";
import { Container, Row, Col } from "react-bootstrap";
import ActivitySubmissionPage from "./ActivitySubmissionPage";

const Exercise = props => {
	const styles = {
		label: {
			fontSize: "1.3em",
			paddingLeft: "0px"
		},
		star: {
			fontSize: "1.4em"
		}
	};

	const getCurrentDate = () => {
		var today = new Date();
		return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	};

	const getCurrentTime = () => {
		var today = new Date();
		return today.toISOString();
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
		setSubmitData(key);
	};

	const [submitData, setSubmitData] = useState({});

	return (
		<ActivitySubmissionPage
			title={`Exercise: ${getType(exerciseType).title}`}
			submissionType="exercise"
			measurementType={getType(exerciseType).entityType}
			submitData={{}}
			patientId={props.match.params.patientid}
			successMessage={`Your ${getType(exerciseType).title.toLowerCase()} has been submitted successfully.`}
			failMessage={`Your ${getType(exerciseType).title.toLowerCase()} could not be submitted.`}>
			<IonItem>
				<IonLabel>
					Date{" "}
					<IonText style={styles.star} color="danger">
						*
					</IonText>
				</IonLabel>
				<ion-datetime placeholder="Select date" value={() => getCurrentDate()}></ion-datetime>
			</IonItem>
			<IonItem>
				<IonLabel>
					Start Time{" "}
					<IonText style={styles.star} color="danger">
						*
					</IonText>
				</IonLabel>
				<IonDatetime display-format="h:mm A" picker-format="h:mm A" placeholder="Select start time"></IonDatetime>
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
						updateData("endTime", e.detail.value);
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
							/>
						</Col>
					</Row>

					<Row style={{ padding: "0px" }}>
						<Col style={{ padding: "0px" }}>
							<IonRadioGroup>
								<IonListHeader className="ion-no-padding">
									<IonLabel>Measurement Type</IonLabel>
								</IonListHeader>

								<Row>
									<Col>
										<IonItem style={{ borderRadius: "15px" }}>
											<IonLabel>Km</IonLabel>
											<IonRadio value="stone" color="tertiary" slot="end" />
										</IonItem>
									</Col>
									<Col>
										<IonItem style={{ borderRadius: "15px" }}>
											<IonLabel>Miles</IonLabel>
											<IonRadio value="pounds" color="tertiary" slot="end" />
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
