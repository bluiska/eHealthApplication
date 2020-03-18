import BackendAccess from "../utilities/BackendAccess";

var UserQueries = {};

UserQueries.getAllPatients = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients"
  });
};
UserQueries.getAllDoctors = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Doctors"
  });
};

UserQueries.getAllTestPatients = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: "contains(id, 'Test')"
    }
  });
};

UserQueries.getAllUnassignedPatients = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: "doctor eq null"
    }
  });
};

UserQueries.getAllTestDoctors = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Doctors",
    query: {
      $filter: "contains(id, 'Test')"
    }
  });
};

UserQueries.getPatientsByDoctorId = doctorId => {
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

UserQueries.assignPatientToDoctor = (doctorId, patientId) => {
  return BackendAccess.IssueODataRequest({
    requestType: "PUT",
    entityType: "Doctors",
    entityID: doctorId,
    entityBody: {
      patients: [{ ID: patientId }]
    }
  });
};

UserQueries.assignDoctorToPatient = (patientId, doctorId) => {
  return BackendAccess.IssueODataRequest({
    requestType: "PUT",
    entityType: "Patients",
    entityID: patientId,
    entityBody: {
      doctor: { ID: doctorId }
    }
  });
};

export default UserQueries;
