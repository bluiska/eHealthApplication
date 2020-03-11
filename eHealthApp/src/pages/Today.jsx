/*
The page displaying the activities of a user for today.
This page allows the user to trigger synchronization as well as
add health data manually.

Author: Gergo Kekesi
*/

import React from 'react';
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg
} from '@ionic/react';

import { sync, add } from 'ionicons/icons';
import pencil from '../resources/pencil.png';
import './Today.css';
import BackButtonToolbar from '../components/BackButtonToolbar';

/*props:
 */
const Today = props => {
  return (
    <IonPage>
      <BackButtonToolbar title="Today: Activities" />
      <IonContent className="ion-padding">
        {/*Activity*/}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>No activity today</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              No activity for today. Synchronize your devices or add an entry manually using the
              plus button below.
            </p>
          </IonCardContent>
        </IonCard>
        {/*Floating action button*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="secondary">
            <IonIcon icon={add} />
          </IonFabButton>

          <IonFabList side="top">
            <IonFabButton
              color="tertiary"
              routerDirection="forward"
              routerLink="/devices"
              data-desc="Synchronize"
            >
              <IonIcon icon={sync} />
            </IonFabButton>
            <IonFabButton
              color="tertiary"
              routerDirection="forward"
              routerLink="/manualentry"
              data-desc="Manual entry"
            >
              <IonImg src={pencil} style={{ width: '20px', height: '20px' }} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Today;
