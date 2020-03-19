/*
Add description

Author: Daniel Madu
*/

import React, { useState, useEffect } from "react";
import {
	IonPage,
	IonContent,
	IonCard,
	IonList,
	IonItem,
	IonLabel,
	IonIcon,
	IonTitle,
	IonButton,
	IonToolbar,
	IonCardHeader,
	IonSpinner
} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import FilterOverview from "./FilterOverview";
import { Accordion, Row, Col, Image, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import RecordCard from "../components/record_cards/RecordCard";

import { options } from "ionicons/icons";
import exercise_img from "../resources/exercise.jpg";
import weight_img from "../resources/weight_scale.jpg";
import ActivityQueries from "../queries/ActivityQueries";
import UserQueries from "../queries/UserQueries";
import { get } from "http";
import { act } from "react-dom/test-utils";
import { firebaseInstance } from "./../components/firebase/firebase";
import fiery from "fiery";
import moment from "moment";

/*props:
 */

const PatientOverview = props => {
	//State
	const [selectedFilter, setSelectedFilter] = useState([]);
	const [selectedDateFilter, setSelectedDateFilterHandler] = useState(new Date("1970-01-01Z00:00:00:000"));
	const [displayFilter, setDisplayFilter] = useState(false);
	const [loading, setLoading] = useState(false);
	//const [activityList, setActivityList] = useState([]);
	const [from, setFrom] = useState(
		moment()
			.subtract(2, "days")
			.format("DD-MM-YYYY")
	);
	const today = new Date();

	const patientId = props.match.params.patientid;
	const patientName = props.match.params.patientname;

	const activitiesReference = firebaseInstance.db
		.ref(`activities/${patientId}`)
		.orderByKey()
		.startAt(from);

	const activities = fiery.useFirebaseDatabase(activitiesReference);

	const yesterday = () => {
		let yesterdaysDate = new Date(today);
		yesterdaysDate.setDate(today.getDate() - 1);
		return yesterdaysDate;
	};

	// const getActivities = (from, to) => {
	// 	let activityList = {};
	// 	let toDate = new Date(to);
	// 	for (var d = new Date(from); d <= toDate; d.setDate(d.getDate() + 1)) {
	// 		activityList[moment(d).format("DD-MM-YYYY")] = [];
	// 	}

	// 	activities.data
	// 		.sort()
	// 		.reverse()
	// 		.map(a => {
	// 			let date = new Date(activity.timestamp).toDateString();
	// 			activities[date].push(activity);
	// 		});

	// 	setActivityList(sortedActivities);
	// };

	/**
	 *
	 * @param {string} date //The date a .toDateString format
	 */
	const appendPreviousActivity = date => {
		// let activities = [...activityList];
		// let newActivity = [date, []];
		// ActivityQueries.getActivitiesByDateRange(
		// 	patientId,
		// 	new Date(date).toISOString().slice(0, 10),
		// 	new Date(date).toISOString().slice(0, 10)
		// ).then(res => {
		// 	//Separate into dates...
		// 	res.map(activity => {
		// 		let date = new Date(activity.timestamp).toDateString();
		// 		newActivity[1].push(activity);
		// 	});
		// 	activities.push(newActivity);
		// 	setActivityList(activities);
		// });
	};

	useEffect(() => {
		// let todayString = today.toDateString();
		// let yesterdayString = yesterday().toDateString();
		// setFrom(yesterdayString);
		// setTo(todayString);
		// getActivities(yesterdayString, todayString);
	}, []);

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
		show: {
			width: "60%",
			margin: "0 auto",
			marginTop: "7%"
		},
		loadingSpinner: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}
	};

	const setSelectedFilterHandler = value => {
		if (!selectedFilter.includes(value)) {
			// adds value to the array (select)
			setSelectedFilter([...selectedFilter, value]);
		} else {
			// removes the value from the array (unselect)
			const res = selectedFilter.filter(item => item !== value);
			setSelectedFilter(res);
		}
	};

	const loadMoreData = () => {
		setLoading(true);
		// the api call to the backend show be made here
		let dayBeforeFrom = new Date(from);
		dayBeforeFrom.setDate(dayBeforeFrom.getDate() - 1);
		appendPreviousActivity(dayBeforeFrom.toDateString());
		setFrom(dayBeforeFrom);
		setLoading(false);
	};

	const dateTitle = date => {
		let displayDate = new Date(date);
		if (displayDate.toDateString() === today.toDateString()) {
			return "Today";
		} else if (displayDate.toDateString() === yesterday().toDateString()) {
			return "Yesterday";
		}
		return date;
	};

	const filterByActivityType = act => {
		return selectedFilter.includes(act.type) || selectedFilter.length === 0;
	};

	const filterByDate = act => {
		return new Date(act) > new Date(selectedDateFilter);
	};

	const sortActivities = (a, b) => {
		const aDate = new Date(a.timestamp);
		const bDate = new Date(b.timestamp);
		return aDate.getTime() > bDate.getTime() ? -1 : 1;
	};

	const makeDatesArray = () => {
		let datesArray = [];
		let days = 0;
		while (
			moment()
				.subtract(days, "days")
				.format("DD-MM-YYYY") !== from
		) {
			datesArray.push(
				moment()
					.subtract(days, "days")
					.format("DD-MM-YYYY")
			);
			days = days + 1;
		}
		return datesArray;
	};

	return (
		<IonPage>
			{!activities.loading && console.log(activities)}
			{!displayFilter && <BackButtonToolbar title={`${patientName}'s Overview`} />}
			{/* Filter button */}
			<IonToolbar>
				{displayFilter && <IonTitle>Filter by</IonTitle>}

				{!displayFilter && (
					<IonButton size="large" expand="block" onClick={() => setDisplayFilter(!displayFilter)}>
						<IonIcon icon={options} />
						<IonTitle>Filter</IonTitle>
					</IonButton>
				)}
			</IonToolbar>
			<IonContent>
				{/* Filter Screen */}
				{displayFilter && (
					<FilterOverview
						selectedDateFilter={selectedDateFilter}
						selectedFilter={selectedFilter}
						setSelectedDateFilterHandler={setSelectedDateFilterHandler}
						setSelectedFilterHandler={setSelectedFilterHandler}
						setDisplayFilter={setDisplayFilter}
					/>
				)}
				{/* Main Content */}
				{!displayFilter && (
					<IonList lines="inset">
						{/* Load the activities */}
						{makeDatesArray().map(date => {
							console.log(date);
							console.log(activities.data);
							if (
								activities &&
								!activities.loading &&
								activities.data &&
								activities.data[date] &&
								activities.data[date].filter(act => filterByActivityType(act)).length > 0
							) {
								//Render activity cardsactivities.data[date]
								return (
									<IonItem key={date}>
										<Container>
											<Row>
												<Col>
													<IonTitle>{dateTitle(date)}</IonTitle>
												</Col>
											</Row>
											<Row>
												<Col>
													{activities.data[date]
														.sort((a, b) => sortActivities(a, b))
														.filter(act => filterByActivityType(act))
														.map((activity, index) => {
															return <RecordCard key={date + index} index={date + index} data={activity} />;
														})}
												</Col>
											</Row>
										</Container>
									</IonItem>
								);
							} else {
								//No activity or loading
								{
									return (activities.data && !activities.data[date]) ||
										!activities.data ||
										activities.data[date].filter(act => filterByActivityType(act)).length === 0 ? (
										<IonItem key={date}>
											<Container>
												<Row>
													<Col>
														<IonTitle>{dateTitle(date)}</IonTitle>
													</Col>
												</Row>
												<Row>
													<Col>
														<IonCard key={date}>
															<IonCardHeader>
																<IonLabel
																	style={{
																		textAlign: "center",
																		fontSize: "1.2em"
																	}}>
																	No activity for this day
																</IonLabel>
															</IonCardHeader>
														</IonCard>
													</Col>
												</Row>
											</Container>
										</IonItem>
									) : (
										<IonSpinner />
									);
								}
							}
						})}

						{loading && (
							<div style={styles.loadingSpinner}>
								<IonSpinner name="crescent" />
							</div>
						)}

						<Container>
							<Row className="justify-content-center">
								<Col xs="8">
									<IonButton
										size="small"
										expand="block"
										fill="outline"
										style={styles.show}
										onClick={() => {
											//let newDate = new Date(from.split("-")[2], from.split("-")[1], from.split("-")[0]);
											// setFrom(
											// 	moment(newDate)
											// 		.subtract(1, "days")
											// 		.format("DD-MM-YYYY")
											// );

											let newFrom = moment(from, "DD-MM-YYYY")
												.subtract(1, "days")
												.format("DD-MM-YYYY");

											console.log(newFrom);
											setFrom(newFrom);
										}}>
										Show more
									</IonButton>
								</Col>
							</Row>
						</Container>
					</IonList>
				)}
			</IonContent>
		</IonPage>
	);
};
export default withRouter(PatientOverview);

/*

todaysANdYesterdaysData = Query.data()

<IonList>

[[today] [yesterday] yesterday - 1] [yesterday - n]]

todaysANdyYesterdaysData.map(day => {

  if(day.length === 0){
    render no activity card
  } else {
    day.map(activity => {
      render the activity card
    })
  }
})

</IonList>

*/

/*

					<IonCard>
						<IonCardHeader>
							<IonCardTitle>No activity for this day</IonCardTitle>
						</IonCardHeader>
				  	</IonCard>


<RecordCard index={data.id} key={data.id} data={data} />

*/
