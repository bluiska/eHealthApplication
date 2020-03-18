import { fiery } from "fiery";
import { firebaseInstance } from "../components/firebase/firebase";

var UserQueries = {};

const patientsRef = firebaseInstance.db.ref("patients");

UserQueries.getAllPatients = () => {
	// return BackendAccess.IssueODataRequest({
	// 	requestType: "GET",
	// 	entityType: "Patients"
	// });
};
UserQueries.getAllDoctors = () => {
	// return BackendAccess.IssueODataRequest({
	// 	requestType: "GET",
	// 	entityType: "Doctors"
	// });
};

UserQueries.getDoctorById = doctorId => {
	// return BackendAccess.IssueODataRequest({
	// 	requestType: "GET",
	// 	entityType: "Patients",
	// 	query: {
	// 		$filter: `doctor/ID eq '${doctorId}'`
	// 	}
	// });
};

UserQueries.getPatientById = pateintId => {
	// return BackendAccess.IssueODataRequest({
	// 	requestType: "GET",
	// 	entityType: "Patients",
	// 	query: {
	// 		$filter: `patient/ID eq '${pateintId}'`
	// 	}
	// });
};

export default UserQueries;
