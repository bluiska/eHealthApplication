/*
Add description

Author: Daniel Madu
*/

import React, { useState } from "react";
import { IonPage, 
		IonContent, 
		IonCard,
		IonCardContent, 
		IonList,
		IonItem, 
		IonGrid,
		IonLabel,
		IonIcon,
		IonTitle,
		useIonViewWillEnter,
		IonRow,
		IonCol,
		IonSelect,
		IonSelectOption,
		IonToolbar} from "@ionic/react";
import { heart } from 'ionicons/icons';
import BackButtonToolbar from "../components/BackButtonToolbar";
import { Container, Row, Col } from "react-bootstrap";

/*props:
 */

const PatientOverview = props => {
	const [userData, setUserData] = useState([])
	const todaysDate = new Date()
	const yesterdaysDate = new Date(todaysDate)
	const [selectedFilter, setSelectedFilter] = useState([])

	const styles = {
		activity: {
			display: "flex"
		},
		icon: {
			float: "left"
		},
		title: {
			float: "center"
		},
		value: {
			float: "right"
		},
		filter: {
			width: "20%"
		}
	};

	const RecordCard = props => {
		return(
			props.data
			.filter(val => selectedFilter.includes(val.name) || selectedFilter.length === 0)
			.map((d, i) =>
				<IonCard key={i}>
					<IonCardContent>
						<IonGrid>
							<IonRow style={styles.activity}>
								<IonCol>
									<IonLabel style={styles.icon}>
										{d.name === "Blood pressure" && <IonIcon icon={heart} />}
									</IonLabel>
									<IonLabel style={styles.title}>
										<h2>{d.name}</h2>
									</IonLabel>
								</IonCol>
								<IonCol>									
									<IonLabel>
										<h3>{d.value}</h3>
									</IonLabel>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCardContent>
				</IonCard>
			)
		)
	}

	useIonViewWillEnter(async () => {
		yesterdaysDate.setDate(todaysDate.getDate() - 1)
		setUserData([
			{name:"Blood pressure", value:"120 mmHg", date: todaysDate.toDateString(), time:	"17:41"},
			 {name:"Blood pressure", value:"130 mmHg", date: todaysDate.toDateString(), time:	"17:41"},
			 {name:"Cycle", value:"20 mins", date: todaysDate.toDateString(), time:	"17:41"},
			 {name:"Run", value:"25 mins", date: todaysDate.toDateString(), time:	"17:41"},
		 	{name:"Blood pressure", value:"135 mmHg", date: yesterdaysDate.toDateString(), time: "05:43"},
			{name:"Blood pressure", value:"140 mmHg", date: yesterdaysDate.toDateString(), time: "16:31"}
		])
	})

	const setSelectedFilterHandler = (event) => {
		setSelectedFilter(event.target.value)
	}

    return(
        <IonPage>
            <BackButtonToolbar title={props.match.params.name + "'s " + "Overview"}/>
			<IonToolbar>
				<IonList>
					<IonItem>
						<IonLabel>Filter by</IonLabel> 
						<IonSelect multiple={true} onIonChange={(event) => setSelectedFilterHandler(event)}>
							<IonSelectOption>Blood pressure</IonSelectOption>
							<IonSelectOption>Run</IonSelectOption>
							<IonSelectOption>Walk</IonSelectOption>
							<IonSelectOption>Cycle</IonSelectOption>
							<IonSelectOption>Weight</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonList>
			</IonToolbar>
            <IonContent className="ion-padding">
				<IonList>
					<IonItem>
						<IonGrid>
							<IonTitle>Today</IonTitle>
							{userData.map((data, i) => 
								data.date == todaysDate.toDateString() && <RecordCard key={i} data={[data]}/>
							)}
						</IonGrid>
					</IonItem>

					<IonItem>
						<IonGrid>
							<IonTitle>Yesterday</IonTitle>
							{userData.map((data, i) => 
								data.date == yesterdaysDate.toDateString() && <RecordCard key={i} data={[data]}/>
							)}
						</IonGrid>
					</IonItem>
				</IonList>
            </IonContent>
        </IonPage>
    )
}

export default PatientOverview;