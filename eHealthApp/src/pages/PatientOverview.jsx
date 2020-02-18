/*
Add description

Author: Daniel Madu
*/

import React from "react";
import { IonPage, 
		IonContent, 
		IonCard,
		IonCardContent, 
		IonList,
		IonItem, 
		IonCardHeader,
		IonGrid,
		IonCardTitle} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";

/*props:
 */
const PatientOverview = props => {
    return(
        <IonPage>
            <BackButtonToolbar title={props.match.params.name + "'s " + "Overview"}/>
            <IonContent className="ion-padding">
				<IonList>
					<IonItem>
						<IonGrid>
							<IonCardTitle>Today</IonCardTitle>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>Blood pressure</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<p>120 mmHg</p>
									<p>Time taken: 17:41</p>
								</IonCardContent>
							</IonCard>
						</IonGrid>
					</IonItem>

					<IonItem>
						<IonGrid>
							<IonCardTitle>Yesterday</IonCardTitle>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>Blood pressure</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<p>135 mmHg</p>
									<p>Time taken: 05:43</p>
								</IonCardContent>
							</IonCard>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>Blood pressure</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<p>140 mmHg</p>
									<p>Time taken: 16:31</p>
								</IonCardContent>
							</IonCard>
						</IonGrid>
					</IonItem>
				</IonList>
            </IonContent>
        </IonPage>
    )
}

export default PatientOverview;