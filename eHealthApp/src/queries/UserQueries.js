/**
 *
 * The following module contains queries used to retrieve and upload
 * user related information to the database. It uses the BackendAccess
 * class to interact with the backend and make the calls.
 *
 */

import BackendAccess from "../utilities/BackendAccess";

var UserQueries = {};

/**
 * Retrieves all the patients available in the database
 * @returns A list of patient objects from the database
 */
UserQueries.getAllPatients = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients"
  });
};

/**
 * Retrieves all the doctors available in the database
 * @returns A list of doctor objects from the database
 */
UserQueries.getAllDoctors = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Doctors"
  });
};

/**
 * Retrieves a doctor by their ID
 *
 * @param {String} doctorId - The ID of the doctor
 * @returns A doctor object
 */
UserQueries.getDoctorById = doctorId => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: `doctor/ID eq '${doctorId}'`
    }
  });
};

/**
 * Retrieves a patient by their ID
 *
 * @param {String} pateintId - The ID of the patient
 * @returns A patient object
 */
UserQueries.getPatientById = pateintId => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: `id eq '${pateintId}'`
    }
  });
};

export default UserQueries;
