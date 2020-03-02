/*
Add description

Author: Gergo Kekesi & Daniel Madu
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
		useIonViewWillEnter, 
		IonList,
		IonItem,
		IonToolbar} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
// import { IonActionSheet } from "@ionic/react";

/*props:
 */
const Patients = props => {
	// const [doctorData, setDoctorData] = useState([])
	const [doctor, setDoctor] = useState('')
	const [dbData, setDBData] = useState([])
	// const [patientData, setPatientData] = useState([])

	const [showActionSheet, setShowActionSheet] = useState(false);


	useIonViewWillEnter(() => {
		// setDoctorData([{id: 'dq24fd1', name: "Daniel"},
		// 				{id: 'eq24fd1', name: "Irek"},
		// 				{id: 'fq24fd1', name: "Andy"},
		// 				{id: 'gq24fd1', name: "Gergo"},
		// 				{id: 'hq24fd1', name: "Mark"},
		// 				{id: 'iq24fd1', name: "Sergio"},
		// 				{id: 'jq24fd1', name: "Margory"},
		// 				{id: 'kq24fd1', name: "Basu"},
		// 				{id: 'lq24fd1', name: "Chris"},
		// 				{id: 'mq24fd1', name: "Jing"},
		// 				{id: 'nq24fd1', name: "Gergo 2"},
		// 				{id: 'oq24fd1', name: "Simon"}])

		// setPatientData([{id: 'dq24fd1', name: "Daniel"},
		// 				{id: 'eq24fd1', name: "Irek"},
		// 				{id: 'fq24fd1', name: "Andy"},
		// 				{id: 'gq24fd1', name: "Gergo"},
		// 				{id: 'hq24fd1', name: "Mark"},
		// 				{id: 'iq24fd1', name: "Sergio"},
		// 				{id: 'jq24fd1', name: "Margory"},
		// 				{id: 'kq24fd1', name: "Basu"},
		// 				{id: 'lq24fd1', name: "Chris"},
		// 				{id: 'mq24fd1', name: "Jing"},
		// 				{id: 'nq24fd1', name: "Gergo 2"},
		// 				{id: 'oq24fd1', name: "Simon"}])
		
		setDBData([
					{name: 'Doctor Daniel', ID: 'Doctor-1234',
					patients: [{id: 'Patient-1234', name: 'Daniel'},{id: 'Patient-1234', name: 'Irek'},{id: 'Patient-1234', name: 'Andy'},{id: 'Patient-1234', name: 'Greg'},
							   {id: 'Patient-1234', name: 'Daniel2'},{id: 'Patient-1234', name: 'Irek2'},{id: 'Patient-1234', name: 'Andy2'},{id: 'Patient-1234', name: 'Greg2'}]},
				
					{name: 'Doctor Mark', ID: 'Doctor-5678',
					patients: [{id: 'Patient-5678', name: 'Sergio'},{id: 'Patient-5678', name: 'Chris'},{id: 'Patient-5678', name: 'Margory'},{id: 'Patient-5678', name: 'Basu'}]}
				])
		
	})

	const selectDoctorHandler = (event) => {
		setDoctor(event.target.value)
	}

	const Patient = (data) => {
		return(
			<IonCard routerDirection="forward" routerLink={"/patientoverview/" + data.patient.name + "/" + data.patient.id}>
				<IonCardHeader>
					<IonCardTitle>Patient's Name: {data.patient.name}</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<p>
						Patient Id: {data.patient.id}
					</p>
				</IonCardContent>
			</IonCard>
		)
	}

	return (
		<IonPage>
			<IonToolbar className="ion-padding">
					<IonLabel>Select doctor</IonLabel>
					<IonSelect interface="popover" onIonChange={(event) => selectDoctorHandler(event)}>
						{dbData.map((doctor, index) => 
							<IonSelectOption value={doctor.ID} key={index}>
								{doctor.name}
							</IonSelectOption>
						)}
					</IonSelect>
			</IonToolbar>
			<BackButtonToolbar title={"Patients"} />
			<IonContent className="ion-padding">		
				{/* <h1>Select a health professional from the list below to view their patients and their data.</h1> */}
				<IonList>
					{/* <IonItem>
						<IonLabel>Select doctor</IonLabel>
						<IonSelect interface="popover" onIonChange={(event) => selectDoctorHandler(event)}>
							{doctorData.map((doctor, index) => 
								<IonSelectOption value={doctor.id} key={index}>
									{doctor.name}
								</IonSelectOption>
							)}
						</IonSelect>
					</IonItem> */}
				


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
					<div>
						<h2>Assigned Patients</h2>
						{dbData.filter((doc) => doc.ID === doctor)
						.map((patients, i1) => 
							patients.patients.map((patient, i2) => 
								<Patient key={i1+i2} patient={patient} />
							)
						)}
					</div>}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Patients;
