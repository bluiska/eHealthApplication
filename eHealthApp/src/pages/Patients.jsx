/*
Add description

Author: Daniel Madu
*/

import React, { Fragment, useEffect, useState } from "react";
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel } from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import UserQueries from "../queries/UserQueries";
import { Row, Container } from "react-bootstrap";
import { firebaseInstance } from "./../components/firebase/firebase";
import fiery from "fiery";

/*props:
 */
const Patients = props => {
	const doctor = props.match.params.docid;

	//const [patients, setPatients] = useState([]);

	const patientsRef = firebaseInstance.db
		.ref("patients")
		.orderByChild("doctor")
		.equalTo(doctor);

	// patientsRef.on("child_added", snapshot => {
	// 	console.log(snapshot.val());
	// });
	const patientsData = fiery.useFirebaseDatabase(patientsRef);

	const patients = !patientsData.loading ? Object.values(patientsData.data) : [];

	/**
	 * When the patients screen loads, all the available patients for that doctor
	 * are retrieved and stored in the state.
	 */
	useEffect(() => {
		// UserQueries.getDoctorById(doctor).then(res => {
		//   setPatients(res);
		// });
	}, []);

	/**
	 * Returns a component that renders the patients data
	 *
	 * @param {Object} data - The patient data object
	 */
	const Patient = data => {
		return (
			<IonCard
				routerDirection="forward"
				routerLink={`/patientoverview/doctor/${doctor}/patient/${data.patient.id}/${data.patient.name}`}>
				<IonCardHeader>
					<IonCardTitle>{data.patient.name}</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<Container>
						<Row>
							<IonLabel>Patient id: {data.patient.id}</IonLabel>
						</Row>
						<Row>
							<IonLabel>Gender: {data.patient.gender}</IonLabel>
						</Row>
						<Row>
							<IonLabel>Date of birth: {new Date(data.patient.dob).toDateString()}</IonLabel>
						</Row>
						<Row>
							<IonLabel>Email: {data.patient.email}</IonLabel>
						</Row>
					</Container>
				</IonCardContent>
			</IonCard>
		);
	};

	return (
		<IonPage>
			<BackButtonToolbar title={"Assigned Patients"} />
			<IonContent className="ion-padding">
				{doctor && (
					<Fragment>
						{!patientsData.loading &&
							patients.length !== 0 &&
							patients.map((patient, index) => <Patient key={index} patient={patient} />)}
					</Fragment>
				)}
			</IonContent>
		</IonPage>
	);
};

export default Patients;
