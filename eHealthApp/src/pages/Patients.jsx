/*
Add description

Author: Gergo Kekesi
*/

import React, { useState, Fragment } from "react";
import { IonPage, 
		IonContent, 
		IonCard, IonCardContent, 
		IonCardHeader, 
		IonCardTitle, 
		IonSelect, 
		IonSelectOption, 
		IonLabel, 
		IonButton, 
		useIonViewWillEnter } from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import { IonActionSheet } from "@ionic/react";

/*props:
 */
const Patients = props => {
	const [doctorData, setDoctorData] = useState([])
	const [doctor, setDoctor] = useState("")
	const [patientData, setPatientData] = useState([])

	const [showActionSheet, setShowActionSheet] = useState(false);


	useIonViewWillEnter(() => {
		setDoctorData([{id: 'dq24fd1', name: "Daniel"},
						{id: 'eq24fd1', name: "Irek"},
						{id: 'fq24fd1', name: "Andy"},
						{id: 'gq24fd1', name: "Gergo"},
						{id: 'hq24fd1', name: "Mark"},
						{id: 'iq24fd1', name: "Sergio"},
						{id: 'jq24fd1', name: "Margory"},
						{id: 'kq24fd1', name: "Basu"},
						{id: 'lq24fd1', name: "Chris"},
						{id: 'mq24fd1', name: "Jing"},
						{id: 'nq24fd1', name: "Gergo 2"},
						{id: 'oq24fd1', name: "Simon"}])

		setPatientData([{id: 'dq24fd1', name: "Daniel"},
						{id: 'eq24fd1', name: "Irek"},
						{id: 'fq24fd1', name: "Andy"},
						{id: 'gq24fd1', name: "Gergo"},
						{id: 'hq24fd1', name: "Mark"},
						{id: 'iq24fd1', name: "Sergio"},
						{id: 'jq24fd1', name: "Margory"},
						{id: 'kq24fd1', name: "Basu"},
						{id: 'lq24fd1', name: "Chris"},
						{id: 'mq24fd1', name: "Jing"},
						{id: 'nq24fd1', name: "Gergo 2"},
						{id: 'oq24fd1', name: "Simon"}])
	})


	const displayPatientData = (data) => {
        // setShowPatientData(true)
		// setUserId(data)
		console.log(data)
	}
	
	const selectDoctorHandler = (event) => {
		setDoctor(event.target.value)
	}

	const selectDoctorHandler2 = (id) => {
		console.log(id)
		setDoctor(id)
	}

	return (
		<IonPage>
			<BackButtonToolbar title={"Patients"} />
			<IonContent className="ion-padding">		
				{/* <h1>Select a health professional from the list below to view their patients and their data.</h1> */}
				<h2>Doctor</h2>
				<IonLabel>Select doctor</IonLabel>
				<IonSelect onIonChange={(event) => selectDoctorHandler(event)}>
					{doctorData.map((doctor, index) => 
						<IonSelectOption value={doctor.id} key={index}>
							{doctor.name}
						</IonSelectOption>
					)}
				</IonSelect>


				{/* <IonButton onClick={() => setShowActionSheet(true)} expand="block">Select doctor</IonButton>
				<IonActionSheet
					isOpen={showActionSheet}				
					onDidDismiss={() => setShowActionSheet(false)}
					buttons={
						doctorData.map((doctor) => {
							return{
								text: doctor.name,
								handler: () => selectDoctorHandler2(doctor.id)
							}
						})
					}
				></IonActionSheet> */}



				{doctor && 
				<Fragment>
					<h2>Assigned Patients</h2>
					{patientData.map((patient, i) => 
					<IonCard key={i} onClick={() => displayPatientData(patient.id)}>
						<IonCardHeader>
							<IonCardTitle>Patient's Id: {patient.id}</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							<p>
								Patient Name: {patient.name}
							</p>
						</IonCardContent>
					</IonCard>
				)}
				</Fragment>
				}
			</IonContent>
		</IonPage>
	);
};

export default Patients;
