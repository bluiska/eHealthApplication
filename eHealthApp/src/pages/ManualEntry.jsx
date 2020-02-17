/*
The manual health data submission page.
Lists various options to submit health data to the app manually.

Author: Gergo Kekesi
*/

import React from "react";
import { IonPage, IonContent, IonList } from "@ionic/react";
import BackButtonToolbar from "./../components/BackButtonToolbar";

/*
props:
 */
const ManualEntry = props => {
	return (
		<IonPage>
			<BackButtonToolbar title={"Manual Entry"} />
			<IonContent className="ion-padding">
				<IonList></IonList>
			</IonContent>
		</IonPage>
	);
};

export default ManualEntry;
