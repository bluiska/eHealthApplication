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

/**props:
  @param {String} props.match.params.patientid - passes the patient's id to the component
  @param {String} props.match.params.patientname - passes the patient's name to the component
 */

const PatientOverview = props => {
	//State
	const [selectedFilter, setSelectedFilter] = useState([]);
	const [selectedDateFilter, setSelectedDateFilterHandler] = useState(new Date("1970-01-01Z00:00:00:000"));
	const [displayFilter, setDisplayFilter] = useState(false);
	const [loading, setLoading] = useState(false);

	//Stores the date to load activities from
	const [from, setFrom] = useState(
		moment()
			.subtract(2, "days")
			.format("DD-MM-YYYY")
	);
	const today = new Date();

	const patientId = props.match.params.patientid;
	const patientName = props.match.params.patientname;

	//Reference to the activities in the database for this user
	const activitiesReference = firebaseInstance.db
		.ref(`activities/${patientId}`)
		.orderByKey()
		.startAt(from);

	//The activities list
	const activities = fiery.useFirebaseDatabase(activitiesReference);

	const yesterday = () => {
		let yesterdaysDate = new Date(today);
		yesterdaysDate.setDate(today.getDate() - 1);
		return yesterdaysDate;
	};

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

	/**
	 * Handles adding the filter value to the filter array
	 * If the value is already in the array, it is removed from the array.
	 * This is done when the filter value is unselected
	 * If the value is not in the array, it is appended to the array.
	 * This is done when the filter value is selected
	 * @param {String} value - filter value selected by the user
	 */
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

	/**
	 * Handles the format tha the date should be returned
	 * @param {String} date - stringified date
	 */
	const dateTitle = date => {
		let displayDate = new Date(date);
		if (displayDate.toDateString() === today.toDateString()) {
			return "Today";
		} else if (displayDate.toDateString() === yesterday().toDateString()) {
			return "Yesterday";
		}
		return date;
	};

	/**
	 * Handles the assertion for filtering by activity type
	 * @param {Object} act - activity object
	 */
	const filterByActivityType = act => {
		return selectedFilter.includes(act.type) || selectedFilter.length === 0;
	};

	/**
	 * Handles the assertion for filtering by date
	 * @param {Object} act - activity object
	 */
	const filterByDate = act => {
		return new Date(act) > new Date(selectedDateFilter);
	};

	/**
	 * Handles the sorting of the activities array
	 * Sorts the array by the time they were saved
	 * @param {Object} a - activity object
	 * @param {Object} b - activity object
	 */
	const sortActivities = (a, b) => {
		const aDate = new Date(a.timestamp);
		const bDate = new Date(b.timestamp);
		return aDate.getTime() > bDate.getTime() ? -1 : 1;
	};

	/**
	 * The following function generates an array of dates in the format DD-MM-YYYY
	 * which is used to track which dates are supposed to be displayed. This is because
	 * empty dates are not stored in the database, however if the user doesn't have any
	 * activity for today or yesterday, we need to render the no activity component.
	 * @returns An array of dates
	 */
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
								//Render activity cards
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
