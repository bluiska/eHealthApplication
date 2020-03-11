import BackendAccess from "../utilities/BackendAccess";

var UserQueries = {};

UserQueries.getAllPatients = () => {
	return BackendAccess.IssueODataRequest({
		requestType: "GET",
		entityType: "Patients"
	});
};
UserQueries.getAllDoctors = () => {
	BackendAccess.IssueODataRequest({
		requestType: "GET",
		entityType: "Doctors"
	});
};

export default UserQueries;
