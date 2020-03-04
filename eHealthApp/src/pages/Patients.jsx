/*
Add description

Author: Gergo Kekesi
*/

import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import BackButtonToolbar from '../components/BackButtonToolbar';

/*props:
 */
const Patients = props => {
  return (
    <IonPage>
      <BackButtonToolbar title={'Patients'} />
      <IonContent className="ion-padding">
        <h1>Health professional's view of patients and their data.</h1>
      </IonContent>
    </IonPage>
  );
};

export default Patients;
