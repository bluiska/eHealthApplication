/*
The applications home page rendered by default when the root URL is visited.
This page allows navigation to the pages that complete the Assignment's tasks.

Author: Gergo Kekesi
*/

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonActionSheet } from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import background_image from "../resources/home_background_blur.jpg";

import "./Home.css";
import { withRouter } from "react-router-dom";
import UserQueries from "./../queries/UserQueries";
import BluetoothSynchronisationManager from "../bluetooth/managers/BluetoothSynchronisationManager";

import { firebaseInstance } from "./../components/firebase/firebase";
import fiery from "fiery";

/*props:
 */
const Home = props => {
	const [showDoctorActionSheet, setShowDoctorActionSheet] = useState(false);
	const [showPatientActionSheet, setShowPatientActionSheet] = useState(false);

	//const [doctors, setDoctors] = useState([]);
	const doctorsRef = firebaseInstance.db.ref("doctors");
	const doctors = fiery.useFirebaseDatabase(doctorsRef);
	const patientsRef = firebaseInstance.db.ref("patients");
	const patients = fiery.useFirebaseDatabase(patientsRef);

	useEffect(() => {
		// UserQueries.getAllDoctors().then(res => {
		// 	setDoctors(res);
		// });
		// UserQueries.getAllPatients().then(res => {
		// 	setPatients(res);
		// });
		//console.log(firebaseInstance.db);
	}, []);

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
			text: doc.name,
			handler: () => {
				props.history.push(`/patients/doctor/${doc.id}`);
			}
		};
	};

	const patientButton = patient => {
		return {
			text: patient.name,
			handler: () => {
				props.history.push(`/today/patient/${patient.id}`);
				BluetoothSynchronisationManager.setPatient(patient.id);
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
					buttons={
						!doctors.loading &&
						doctors.data.map(doc => {
							return docButton(doc);
						})
					}
				/>
				<IonActionSheet
					isOpen={showPatientActionSheet}
					onDidDismiss={() => setShowPatientActionSheet(false)}
					header="Select a patient:"
					buttons={
						!patients.loading &&
						patients.data.map(patient => {
							return patientButton(patient);
						})
					}
				/>
			</IonContent>
		</IonPage>
	);
};

export default withRouter(Home);
