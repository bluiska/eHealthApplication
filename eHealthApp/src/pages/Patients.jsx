/*
Add description

Author: Daniel Madu
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
		IonToolbar} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";

/*props:
 */
const Patients = props => {

	const [doctor, setDoctor] = useState('')
	const [dbData, setDBData] = useState([])


	useIonViewWillEnter(() => {
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
				{doctor && 
					<Fragment>
						<h2>Assigned Patients</h2>
						{dbData.filter((doc) => doc.ID === doctor)
						.map((patients, i1) => 
							patients.patients.map((patient, i2) => 
								<Patient key={i1+i2} patient={patient} />
							)
						)}
					</Fragment>
				}
			</IonContent>
		</IonPage>
	);
};

export default Patients;
