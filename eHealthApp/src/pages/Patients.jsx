import React from "react";
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle
} from "@ionic/react";

const Patients = props => {
	return (
		<IonPage>
			<IonHeader>
				{/*TODO: Check if we need backbutton based on design*/}
				<IonToolbar>
					<IonTitle>Patients</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<h1>Health professional's view of patients and their data.</h1>
			</IonContent>
		</IonPage>
	);
};

export default Patients;
