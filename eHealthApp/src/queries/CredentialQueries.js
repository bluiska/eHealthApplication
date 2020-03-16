import BackendAccess from "../utilities/BackendAccess";

var CredentialQueries = {};

CredentialQueries.createUserProfile = (userType, userDetails) => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: userType,
    entityBody: userDetails
  });
};

CredentialQueries.createUserCredential = (credentialDetails) => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: "Credentials/Register",
    entityBody: credentialDetails
  });
};

CredentialQueries.verifyUserCredential = (credentialDetails) => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: "Credentials/Login",
    entityBody: credentialDetails
  });
}

export default CredentialQueries;
