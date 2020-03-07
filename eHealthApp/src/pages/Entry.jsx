import React, { useState } from 'react';
import { IonHeader, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonInput, IonCardTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonTitle, IonItemGroup, IonSlides, IonSlide, IonModal } from '@ionic/react';

import RegistrationModal from '../components/RegistrationModal';
import './Entry.css'

const Entry = () => {
  const [showModal, setShowModal] = useState(false);

  async function closeModal() {
    await setShowModal(false);
  }

  return (
  <IonContent>
    <IonModal isOpen={showModal}>
      <RegistrationModal closeAction={closeModal}></RegistrationModal>
    </IonModal>
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
            <IonInput placeholder="Username"/>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Password"
              type="password"/>
          </IonItem>
          <section>
            <IonButton
                expand="block"
                shape="round"
                routerDirection="forward"
                routerLink={"/home"}>
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
  </IonContent>
)};

export default Entry;