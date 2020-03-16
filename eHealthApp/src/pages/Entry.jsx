import React, { useState } from 'react';
import { IonHeader, IonPage, IonAlert, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonToast, IonInput, IonCardTitle, IonToolbar, IonItem, IonTitle, IonItemGroup, IonModal } from '@ionic/react';

import RegistrationModal from '../components/RegistrationModal';
import CredentialQueries from '../queries/CredentialQueries';
import './Entry.css';

const Entry = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [isCredentialInvalid, setIsCredentialInvalid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toastIsShown, setToastIsShown] = useState(false);

  async function closeModal(state) {
    await setShowModal(false);
    if(state) await setToastIsShown(true);
  }

  function verifyUser() {
    CredentialQueries.verifyUserCredential({
      username: username,
      password: password
    })
    .then(res => {
      redirectToUser(res.user.id);
    })
    .catch(async err => {
      let error = await err.json();
      produceInvalidMessage(error.value);
    })
  }

  function redirectToUser(userId) {    
    let patientPredicate = "Patient",
        doctorPredicate = "Doctor",
        userRole = userId.includes(patientPredicate) ? patientPredicate : userId.includes(doctorPredicate) ? doctorPredicate : "unknown";
    
    props.history.push( `/today/${userRole}/${userId}`);
  }

  function produceInvalidMessage(error) {
    setErrMsg(error);
    setIsCredentialInvalid(true);
  }

  return (
    <IonPage>
      <IonAlert
        isOpen={isCredentialInvalid}
        onDidDismiss={() => setIsCredentialInvalid(false)}
        header="Login failed."
        message={errorMsg}
        buttons={["OK"]}
      />
      <IonContent>
        <IonModal isOpen={showModal}>
          <RegistrationModal closeAction={closeModal}></RegistrationModal>
        </IonModal>
        <IonToast
          isOpen={toastIsShown}
          onDidDismiss={() => setToastIsShown(false)}
          message="Registration successful!"
          duration={3000} />
        <IonHeader>
          <IonToolbar>
              <IonTitle>eHealth Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
                Login
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItemGroup>
              <IonItem>
                <IonInput 
                  placeholder="Username"
                  onIonInput={e => setUsername(e.target.value)}/>
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Password"
                  type="password"
                  onIonInput={e => setPassword(e.target.value)}/>
              </IonItem>
              <section>
                <IonButton
                    expand="block"
                    shape="round"
                    onClick={() => verifyUser()}>
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
                  onClick={() => setShowModal(true)}>
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
                    routerLink={"/home"}>
                    Try Demo
                </IonButton>
              </section>
            </IonItemGroup>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>

)};

export default Entry;