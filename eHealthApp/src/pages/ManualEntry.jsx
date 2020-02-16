import React from "react";
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle
} from "@ionic/react";

const ManualEntry = props => {
	return (
		<IonPage>
			<IonHeader>
				{/*TODO: Check if we need back button based on design*/}
				<IonToolbar>
					<IonTitle>Manual entry</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<h1>Manual entry screen.</h1>
			</IonContent>
		</IonPage>
	);
};

export default ManualEntry;
