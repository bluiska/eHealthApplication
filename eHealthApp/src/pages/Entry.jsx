import React, { useState } from 'react';
import { IonHeader, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonToast, IonInput, IonCardTitle, IonToolbar, IonItem, IonTitle, IonItemGroup, IonModal } from '@ionic/react';

import RegistrationModal from '../components/RegistrationModal';
import CredentialQueries from '../queries/CredentialQueries';
import './Entry.css';

const Entry = () => {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toastIsShown, setToastIsShown] = useState(false);

  async function closeModal(state) {
    await setShowModal(false);
    if(state) await setToastIsShown(true);
  }

  function verifyUser() {
    console.log(`user: ${username}`)
    console.log(`password: ${password}`)
    //CredentialQueries
    console.log("clicked");
  }

  return (
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
          <IonTitle>E-Health</IonTitle>
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
)};

export default Entry;