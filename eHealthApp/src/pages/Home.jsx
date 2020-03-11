/*
The applications home page rendered by default when the root URL is visited.
This page allows navigation to the pages that complete the Assignment's tasks.

Author: Gergo Kekesi
*/

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonActionSheet } from "@ionic/react";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import background_image from "../resources/home_background_blur.jpg";

import "./Home.css";
import { withRouter } from "react-router-dom";

var doctors = ["Dr. Greg", "Dr. Irek", "Dr. Daniel"];
var patients = ["Andy", "Lee", "Tennant"];

/*props:
 */
const Home = props => {
	const [showDoctorActionSheet, setShowDoctorActionSheet] = useState(false);
	const [showPatientActionSheet, setShowPatientActionSheet] = useState(false);

	const styles = {
		home: {
			width: "100%",
			height: "100%",
			backgroundImage: `url(${background_image})`,
			backgroundSize: "cover"
		}
	};

	const docButton = doc => {
		return {
			text: doc,
			handler: () => {
				props.history.push(`/patients/${doc}`);
			}
		};
	};

	const patientButton = patient => {
		return {
			text: patient,
			handler: () => {
				props.history.push(`/today/patient/${patient}`);
			}
		};
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>eHealth Application</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="ion-padding" style={styles.home}>
					<Container>
						<Row>
							<Col>
								<IonButton
									size="large"
									expand="block"
									style={{ marginBottom: "30px" }}
									onClick={() => setShowPatientActionSheet(true)}>
									Today's Activity
								</IonButton>
							</Col>
						</Row>
						<Row>
							<Col>
								<IonButton size="large" expand="block" onClick={() => setShowDoctorActionSheet(true)}>
									View Patients
								</IonButton>
							</Col>
						</Row>
						<Row></Row>
					</Container>
				</div>
				<IonActionSheet
					isOpen={showDoctorActionSheet}
					onDidDismiss={() => setShowDoctorActionSheet(false)}
					header="Select a doctor:"
					buttons={doctors.map(doc => {
						return docButton(doc);
					})}
				/>
				<IonActionSheet
					isOpen={showPatientActionSheet}
					onDidDismiss={() => setShowPatientActionSheet(false)}
					header="Select a patient:"
					buttons={patients.map(patient => {
						return patientButton(patient);
					})}
				/>
			</IonContent>
		</IonPage>
	);
};

export default withRouter(Home);
