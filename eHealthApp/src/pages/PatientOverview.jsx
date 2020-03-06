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
		IonButton,
		IonToolbar} from "@ionic/react";
import { heart, options } from 'ionicons/icons';
import BackButtonToolbar from "../components/BackButtonToolbar";
import { Container, Row, Col } from "react-bootstrap";
import FilterOverview from "./FilterOverview";

/*props:
 */

const PatientOverview = props => {
	const [userData, setUserData] = useState([])
	const todaysDate = new Date()
	const yesterdaysDate = new Date(todaysDate)
	const [selectedFilter, setSelectedFilter] = useState([])
	const [displayFilter, setDisplayFilter] = useState(false)

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

	const setSelectedFilterHandler = (value) => {
		if (!selectedFilter.includes(value)) {
			// adds value to the array (select)
			setSelectedFilter([...selectedFilter, value])
		} else {
			// removes the value from the array (unselect)
			const res = selectedFilter.filter(item => item !== value)
			setSelectedFilter(res)
		}
	}

    return(
        <IonPage>
            {!displayFilter && <BackButtonToolbar title={props.match.params.name + "'s " + "Overview"}/>}
			
			<IonToolbar>
				{/* <IonCard color="secondary" style={styles.filter} onClick={() => setDisplayFilter(!displayFilter)}>
					<IonCardContent>
						<IonIcon icon={options}/>
						Filter
					</IonCardContent>
				</IonCard> */}

				{displayFilter &&
					<IonTitle>Filter by</IonTitle>}
				
				{!displayFilter &&
					<IonButton size="large" expand="block" onClick={() => setDisplayFilter(!displayFilter)}>
						<IonIcon icon={options}/>
						<IonTitle>Filter</IonTitle>
					</IonButton>}

			</IonToolbar>
            <IonContent className="ion-padding">
				{displayFilter && <FilterOverview selectedFilter={selectedFilter} setSelectedFilterHandler={setSelectedFilterHandler} setDisplayFilter={setDisplayFilter}/>}

				{!displayFilter && 
				<IonList>
					<IonItem>
						<IonGrid>
							<IonTitle>Today</IonTitle>
							{userData.map((data, i) => 
								data.date === todaysDate.toDateString() && <RecordCard key={i} data={[data]}/>
							)}
						</IonGrid>
					</IonItem>

					<IonItem>
						<IonGrid>
							<IonTitle>Yesterday</IonTitle>
							{userData.map((data, i) => 
								data.date === yesterdaysDate.toDateString() && <RecordCard key={i} data={[data]}/>
							)}
						</IonGrid>
					</IonItem>
				</IonList>}
            </IonContent>
        </IonPage>
    )
}

export default PatientOverview;