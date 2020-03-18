import React, { useState } from "react";
import {
  IonHeader,
  IonPage,
  IonAlert,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonToast,
  IonInput,
  IonCardTitle,
  IonToolbar,
  IonItem,
  IonTitle,
  IonItemGroup,
  IonModal
} from "@ionic/react";

import RegistrationModal from "../components/RegistrationModal";
import CredentialQueries from "../queries/CredentialQueries";
import CredentialManager from "../utilities/CredentialManager";
import "./Entry.css";

const Entry = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isToastActivated, setIsToastActivated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);

  async function closeModal(state) {
    await setShowModal(false);
    if (state) {
      await setToastMsg("Registration");
      await setIsToastDisplayed(true);
    }
  }

  function verifyUser() {
    CredentialQueries.verifyUserCredential({
      username: username,
      password: CredentialManager.EncryptAccesscode(username, password)
    })
      .then(res => {
        setToastMsg("Login");
        setIsToastDisplayed(true);
        redirectToUser(res.user.id);
      })
      .catch(async err => {
        let error = await err.json();
        produceInvalidMessage(error.value);
      });
  }

  function redirectToUser(userId) {
    let patientPredicate = "Patient",
      doctorPredicate = "Doctor",
      userRole = "unknown",
      rolebasedView = "unknown";

    if (userId.includes(patientPredicate)) {
      userRole = patientPredicate;
      rolebasedView = "activities";
    } else if (userId.includes(doctorPredicate)) {
      userRole = doctorPredicate;
      rolebasedView = "mypatients";
    } else {
      setErrMsg("");
      setIsToastActivated(true);
      return;
    }

    props.history.push(`/${userRole.toLowerCase()}/${userId}/${rolebasedView}`);
  }

  function produceInvalidMessage(error) {
    setErrMsg(error);
    setIsToastActivated(true);
  }

  return (
    <IonPage>
      <IonAlert
        isOpen={isToastActivated}
        onDidDismiss={() => setIsToastActivated(false)}
        header="Login failed."
        message={errorMsg}
        buttons={["OK"]}
      />
      <IonModal isOpen={showModal}>
        <RegistrationModal closeAction={closeModal}></RegistrationModal>
      </IonModal>
      <IonToast
        isOpen={isToastDisplayed}
        onDidDismiss={() => setIsToastDisplayed(false)}
        message={`${toastMsg} successful!`}
        duration={2000}
      />
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>eHealth Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Login</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItemGroup>
              <IonItem>
                <IonInput
                  placeholder="Username"
                  onIonInput={e => setUsername(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Password"
                  type="password"
                  onIonInput={e => setPassword(e.target.value)}
                />
              </IonItem>
              <section>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={() => verifyUser()}
                >
                  Login
                </IonButton>
              </section>
            </IonItemGroup>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Registration</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItemGroup>
              <section>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={() => setShowModal(true)}
                >
                  Create new account
                </IonButton>
              </section>
            </IonItemGroup>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Demo Sandbox</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItemGroup>
              <section>
                <IonButton
                  expand="block"
                  shape="round"
                  routerDirection="forward"
                  routerLink={"/demo"}
                >
                  Try Demo
                </IonButton>
              </section>
            </IonItemGroup>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Entry;
