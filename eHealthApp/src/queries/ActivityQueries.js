/**
 *
 * The following module contains to code to submit
 * activity related information to the database.
 *
 */

import { firebaseInstance } from "./../components/firebase/firebase";
import fiery from "fiery";
import moment from "moment";

var ActivityQueries = {};

/**
 * The following query will upload a new activity for the given patient
 * The activity should be provided as an object containing the necessary metadata
 * to upload to the database. For this see the schema README file.
 *
 * @param {String} patientID - The id of the patient
 * @param {String} exercise - The exercise object
 * @returns A promise which if fulfilled means success if rejected means error
 * */
ActivityQueries.uploadNewActivity = async (patientId, submitData) => {
	console.log(patientId);

	let date = moment().format("DD-MM-YYYY");
	let propDate = moment(submitData.timestamp).format("DD-MM-YYYY");

	let activitiesRef = firebaseInstance.db.ref(`/activities/${patientId}/${propDate || date}`);

	activitiesRef.once("value").then(s => {
		console.log("doesn't exists");
		//The current day doesn't exist yet
		if (!s.val()) {
			return activitiesRef.child("0").set({
				timestamp: new Date().getTime(),
				...submitData
			});
		} else {
			console.log("exists");
			//The day exists so just push
			return activitiesRef.child(s.val().length).set({
				timestamp: new Date().getTime(),
				...submitData
			});
		}
	});
};

export default ActivityQueries;
