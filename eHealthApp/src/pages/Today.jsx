import React, { useState, useEffect } from "react";
import {
	IonPage,
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonFabList,
	IonItem,
	IonImg,
	IonList,
	IonSpinner,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent
} from "@ionic/react";
import { sync, add } from "ionicons/icons";
import { withRouter } from "react-router-dom";
import moment from "moment";

import ActivityQueries from "../queries/ActivityQueries";
import RecordCard from "../components/record_cards/RecordCard";
import BackButtonToolbar from "../components/BackButtonToolbar";
import BluetoothSynchronisationManager from "../bluetooth/managers/BluetoothSynchronisationManager";
import pencil from "../resources/pencil.png";
import "./Today.css";
import { firebaseInstance } from "../components/firebase/firebase";
import fiery from "fiery";

const Today = props => {
	// Setting the selected patient using default values
	const patientId = props.match.params.patientid || "unknown";

	//The database reference to the activities of a user
	const activitiesReference = firebaseInstance.db.ref(`activities/${patientId}/${moment().format("DD-MM-YYYY")}`);

	//The activities of the user for today.
	const todaysActivities = fiery.useFirebaseDatabase(activitiesReference);

	// Styles for all components
	const styles = {
		list: {
			width: "100%"
		}
	};

	// Instantiating the component to IonSpinner
	// This will be shown if the data cannot be fetched from the database
	let activitiesComponent = <IonSpinner />;

	//Sorts the activities by time
	const sortActivities = (a, b) => {
		const aDate = new Date(a.timestamp);
		const bDate = new Date(b.timestamp);
		return aDate.getTime() > bDate.getTime() ? -1 : 1;
	};

	/**
	 * Returns the correct component for Today's activities based on the content of
	 * todaysActivities array
	 * For no activities, displays 'No Activity' card
	 * For one or more activities, displays them as RecordCard component
	 */
	const handleActivitiesComponentChange = () => {
		console.log(todaysActivities.data);

		if (!todaysActivities.data || todaysActivities.data.length === 0) {
			return (
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>No activity today</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<p>No activity for today. Synchronize your devices or add an entry manually using the plus button below.</p>
					</IonCardContent>
				</IonCard>
			);
		} else if (!todaysActivities.loading && todaysActivities.data.length > 0) {
			return (
				<IonItem>
					<IonList style={styles.list}>
						{todaysActivities.data
							.sort((a, b) => sortActivities(a, b))
							.map(activity => {
								return <RecordCard key={activity.timestamp} index={activity.timestamp} data={activity} />;
							})}
					</IonList>
				</IonItem>
			);
		} else {
			return activitiesComponent;
		}
	};

	return (
		<IonPage>
			<BackButtonToolbar title="Today: Activities" />
			<IonContent className="ion-padding">
				{/*Activity*/}
				{handleActivitiesComponentChange()}
				{/*Floating action button*/}
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="secondary">
						<IonIcon icon={add} />
					</IonFabButton>

					<IonFabList side="top">
						<IonFabButton color="tertiary" routerDirection="forward" routerLink="/devices" data-desc="Synchronize">
							<IonIcon icon={sync} />
						</IonFabButton>
						<IonFabButton
							color="tertiary"
							routerDirection="forward"
							routerLink={"/manualentry/patient/" + patientId}
							data-desc="Manual entry">
							<IonImg src={pencil} style={{ width: "20px", height: "20px" }} />
						</IonFabButton>
					</IonFabList>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default withRouter(Today);
