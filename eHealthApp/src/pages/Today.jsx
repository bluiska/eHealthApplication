import React from "react";
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonFab,
	IonFabButton,
	IonIcon,
	IonFabList,
	IonLabel,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent
} from "@ionic/react";

import { list, sync, add } from "ionicons/icons";

const Today = props => {
	return (
		<IonPage>
			<IonHeader>
				{/*TODO: Check if we need back button based on design*/}
				<IonToolbar>
					<IonTitle>Today: Activities</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				{/*Activity*/}
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>No activity today</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<p>
							No activity for today. Synchronize your devices or add an entry
							manually using the plus button below.
						</p>
					</IonCardContent>
				</IonCard>

				{/*Floating action button*/}
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="secondary">
						<IonIcon icon={add} />
					</IonFabButton>

					<IonFabList side="top">
						<IonFabButton
							color="tertiary"
							routerDirection="forward"
							routerLink="/devices">
							<IonIcon icon={sync} />
						</IonFabButton>
						<IonFabButton
							color="tertiary"
							routerDirection="forward"
							routerLink="/manualentry">
							<IonIcon icon={list} />
						</IonFabButton>
					</IonFabList>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Today;
