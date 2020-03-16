import BackendAccess from "../utilities/BackendAccess";

var CredentialQueries = {};

CredentialQueries.uploadNewExercise = (patient, exercise) => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: exercise.type,
    entityBody: {
      patient: { ID: patient },
      timestamp: new Date(),
      ...exercise.data,
      steps: exercise.data.steps || -1,
      caloriesburnt: exercise.data.caloriesburnt || -1
    }
  });
};

CredentialQueries.uploadNewMeasurement = async (patient, measurement) => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: measurement.type,
    entityBody: {
      patient: { ID: patient },
      timestamp: new Date(),
      ...measurement.data
    }
  });
};

export default CredentialQueries;
