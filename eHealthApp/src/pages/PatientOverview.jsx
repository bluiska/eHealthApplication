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
		IonButton,
		IonToolbar,
		IonCardHeader} from "@ionic/react";
import { heart, options } from 'ionicons/icons';
import BackButtonToolbar from "../components/BackButtonToolbar";
import FilterOverview from "./FilterOverview";
import { Accordion, Row, Col, Image, Container } from "react-bootstrap";

import exercise_img from "../resources/exercise.jpg";
import weight_img from "../resources/weight_scale.jpg";
import walk_img from "../resources/walk.png";
import run_img from "../resources/run.png";
import cycle_img from "../resources/cycle.png";

/*props:
 */

const PatientOverview = props => {
	const todaysDate = new Date()
	const [userData, setUserData] = useState([
		{id: "activity1", name:"Blood pressure", value:"120 mmHg", date: "Wed Mar 11 2020", time:	"17:41"},
		{id: "activity2", name:"Blood pressure", value:"130 mmHg", date: "Wed Mar 11 2020", time:	"15:31"},
		{id: "activity3", name:"Cycle", value:"20 mins", date: "Wed Mar 11 2020", time:	"13:21"},
		{id: "activity4", name:"Run", value:"25 mins", date: "Wed Mar 11 2020", time:	"14:11"},
		 {id: "activity5", name:"Blood pressure", value:"135 mmHg", date: "Tue Mar 10 2020", time: "05:43"},
		{id: "activity6", name:"Blood pressure", value:"140 mmHg", date: "Tue Mar 10 2020", time: "16:31"},
		{id: "activity7", name:"Blood pressure", value:"140 mmHg", date: "Mon Mar 9 2020", time: "16:21"}
	])
	
	let yesterdaysDate = new Date(todaysDate)
	yesterdaysDate.setDate(todaysDate.getDate() - 1)

	const [selectedFilter, setSelectedFilter] = useState([])
	const [displayFilter, setDisplayFilter] = useState(false)
	const [showMore, setShowMore] = useState(false)

	const dataForToday = userData.filter(val => val.date === todaysDate.toDateString())
	const dataForYesterday = userData.filter(val => val.date === yesterdaysDate.toDateString())
	const restOfTheData = userData.filter(val => val.date !== yesterdaysDate.toDateString() && val.date !== todaysDate.toDateString())

	const styles = {
		activity: {
			display: "inline-block"
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
		},
		iconimg: {
			width: "20px",
			height: "20px",
			margin: "auto"
		},
		show: {
			width: "60%",
			margin: "0 auto",
			marginTop: "7%"
		}
	};

	const RecordCard = props => {
		console.log(props)
		return(
			<Accordion>
				<IonCard key={props.index}>
					<Accordion.Toggle as={IonCardHeader} eventKey={props.index}>
						<Row className="align-content-center justify-content-center">
							<Col xs="3">
								{props.data.name === "Blood pressure" && <div style={styles.iconimg}>
																	<IonIcon icon={heart} style={styles.iconimg}/>
																</div>}
								{props.data.name === "Cycle" && <Image src={cycle_img} style={styles.iconimg} />}
								{props.data.name === "Run" && <Image src={run_img} style={styles.iconimg} />}
							</Col>
							<Col xs="7">
								<IonLabel style={styles.title}>
									<h2>{props.data.name}</h2>
								</IonLabel>
							</Col>
							<Col xs="2">									
								<IonLabel style={styles.value}>
									<h3>{props.data.value}</h3>
								</IonLabel>
							</Col>
						</Row>
					</Accordion.Toggle>
					
					<Accordion.Collapse eventKey={props.index}>
						<IonCardContent>
							<IonLabel>
								Date: {props.data.date}
							</IonLabel>
							<IonLabel>
								Time: {props.data.time}
							</IonLabel>
						</IonCardContent>
					</Accordion.Collapse>
				</IonCard>
				
				</Accordion>
		)
	}

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

  return (
    <IonPage>
      {!displayFilter && (
        <BackButtonToolbar title={"Patient Name's " + "Overview"} />)}
		<IonToolbar>
				{displayFilter && <IonTitle>Filter by</IonTitle>}
				
				{!displayFilter &&
					<IonButton size="large" expand="block" onClick={() => setDisplayFilter(!displayFilter)}>
						<IonIcon icon={options}/>
						<IonTitle>Filter</IonTitle>
					</IonButton>}
		</IonToolbar>
		<IonContent className="ion-padding">
				{!displayFilter && 
				<IonList>
					<IonItem>
						{dataForToday &&
						<IonGrid>
							<IonTitle>Today</IonTitle>
							{dataForToday
							.filter(val => selectedFilter.includes(val.name) || selectedFilter.length === 0)
							.map((data) => 
								data.date === todaysDate.toDateString() && <RecordCard index={data.id} key={data.id} data={data}/>
							)}
						</IonGrid>
						}
					</IonItem>
					
					<IonItem>
						{yesterdaysDate &&
						<IonGrid>
							<IonTitle>Yesterday</IonTitle>
							{/* {console.log(yesterdaysDate)} */}
							{dataForYesterday
							.filter(val => selectedFilter.includes(val.name) || selectedFilter.length === 0)
							.map((data) => 
								data.date === yesterdaysDate.toDateString() && <RecordCard index={data.id} key={data.id} data={data}/>
							)}
						</IonGrid>
						}
					</IonItem>
					{!showMore
					&&
					<Container>
						<Row className="justify-content-center">
							<Col xs="8">
								<IonButton size="small" expand="block" fill="outline" style={styles.show} onClick={() => setShowMore(true)}>
									Show more
								</IonButton>
							</Col>
						</Row>
					</Container>
					}
				</IonList>}
            </IonContent>
        </IonPage>
    )
}
export default PatientOverview;
