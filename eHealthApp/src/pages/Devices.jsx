/*
The page that displays the devices connected to the app.
If no devices are available, it allows the connection of a new device.
To be completed by Irek....

Author: Gergo Kekesi
*/

import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";

/*props:
 */
const Devices = props => {
	return (
		<IonPage>
			<BackButtonToolbar title="Devices" />
			<IonContent className="ion-padding">
				<h1>Devices page</h1>
			</IonContent>
		</IonPage>
	);
};

export default Devices;
