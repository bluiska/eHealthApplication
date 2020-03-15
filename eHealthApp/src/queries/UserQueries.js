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

export default UserQueries;
