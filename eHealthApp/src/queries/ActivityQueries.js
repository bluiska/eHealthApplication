import BackendAccess from "../utilities/BackendAccess";

var ActivityQueries = {};

ActivityQueries.getActivitiesByDateRange = (patientID, from, to) => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Activities",
    query: {
      $filter: `patient/ID eq '${patientID}' and date(timestamp) le ${to} and date(timestamp) ge ${from}`
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
  switch (exercise.type) {
    case "walk":
      BackendAccess.IssueODataRequest({
        requestType: "POST",
        entityType: exercise.type,
        entityBody: {
          patient: { ID: patient },
          ...exercise
        }
      });
      break;

    default:
      break;
  }
};

ActivityQueries.uploadNewMeasurement = (patient, measurement) => {
  console.log("bazinga got here ", patient, "  ", measurement)
  switch (measurement.type) {
    case "walk":
      BackendAccess.IssueODataRequest({
        requestType: "POST",
        entityType: measurement.type,
        entityBody: {
          patient: { ID: patient },
          ...measurement
        }
      });
      break;

    default:
      break;
  }
};

export default ActivityQueries;
