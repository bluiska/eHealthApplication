import React from "react";
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle
} from "@ionic/react";

const Devices = props => {
	return (
		<IonPage>
			<IonHeader>
				{/*TODO: Check if we need back button based on design*/}
				<IonToolbar>
					<IonTitle>Devices</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<h1>Devices page</h1>
			</IonContent>
		</IonPage>
	);
};

export default Devices;
