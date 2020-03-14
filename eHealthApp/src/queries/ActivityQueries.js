import BackendAccess from "../utilities/BackendAccess";

var ActivityQueries = {};

ActivityQueries.getActivitiesByDateRange = (patientID, from, to) => {
	return BackendAccess.IssueODataRequest({
		requestType: "GET",
		entityType: "Activities",
		query: {
			$filter: `patient/ID eq '${patientID}' and date(timestamp) ge ${from} and date(timestamp) le ${to} patient/ID eq '${patientID}'`
		}
	});
};

ActivityQueries.getTodaysActivities = (patientID, today) => {
	return BackendAccess.IssueODataRequest({
		requestType: "GET",
		entityType: "Activities",
		query: {
			$filter: `patient/ID eq '${patientID}' and date(timestamp) eq ${today}`
		}
	});
};

ActivityQueries.uploadNewExercise = (patient, exercise) => {
	return BackendAccess.IssueODataRequest({
		requestType: "POST",
		entityType: exercise.type,
		entityBody: {
			name: "exercise",
			patient: { ID: patient },
			timestamp: new Date(),
			...exercise
		}
	});
};

ActivityQueries.uploadNewMeasurement = async (patient, measurement) => {
	return BackendAccess.IssueODataRequest({
		requestType: "POST",
		entityType: measurement.type,
		entityBody: {
			name: "measurement",
			patient: { ID: patient },
			timestamp: new Date(),
			...measurement.data
		}
	});
};

export default ActivityQueries;
