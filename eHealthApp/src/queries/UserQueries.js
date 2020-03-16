import BackendAccess from "../utilities/BackendAccess";

var odataClient = new BackendAccess();
var UserQueries = {};

UserQueries.getAllPatients = () => {
  return odataClient.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients"
  });
};
UserQueries.getAllDoctors = () => {
  return odataClient.IssueODataRequest({
    requestType: "GET",
    entityType: "Doctors"
  });
};

UserQueries.getDoctorById = doctorId => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: `doctor/ID eq '${doctorId}'`
    }
  });
};

UserQueries.getPatientById = pateintId => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: `patient/ID eq '${pateintId}'`
    }
  });
};

export default UserQueries;
