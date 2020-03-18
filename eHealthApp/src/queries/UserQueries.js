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

/**
 * Retrieves all the doctors available in the database
 * @returns A list of doctor objects from the database
 */
UserQueries.getAllDoctors = () => {
	// return BackendAccess.IssueODataRequest({
	// 	requestType: "GET",
	// 	entityType: "Doctors"
	// });
};

/**
 * Retrieves a doctor by their ID
 *
 * @param {String} doctorId - The ID of the doctor
 * @returns A doctor object
 */
UserQueries.getDoctorById = doctorId => {
	// return BackendAccess.IssueODataRequest({
	// 	requestType: "GET",
	// 	entityType: "Patients",
	// 	query: {
	// 		$filter: `doctor/ID eq '${doctorId}'`
	// 	}
	// });
};

/**
 * Retrieves a patient by their ID
 *
 * @param {String} pateintId - The ID of the patient
 * @returns A patient object
 */
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
