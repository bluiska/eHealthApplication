import React from 'react';
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonListHeader,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonFooter
} from '@ionic/react';
import BackButtonToolbar from '../../components/BackButtonToolbar';
import { Container, Row, Col } from 'react-bootstrap';
import FooterSubmitButton from '../../components/FooterSubmitButton';

const Weight = () => {
  return (
    <IonPage>
      <BackButtonToolbar title={'Weight entry'} />
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">
            Weight <IonText color="danger">*</IonText>
          </IonLabel>
          <IonInput type="number" placeholder="Enter your weight" clearInput />
        </IonItem>
        <IonRadioGroup>
          <IonListHeader>
            <IonLabel>Measurement Type</IonLabel>
          </IonListHeader>

          <Container>
            <Row>
              <Col style={{ padding: '0px' }}>
                <IonItem style={{ borderRadius: '15px' }}>
                  <IonLabel>Kg</IonLabel>
                  <IonRadio value="kg" color="tertiary" checked="true" />
                </IonItem>
              </Col>
              <Col style={{ padding: '0px' }}>
                <IonItem style={{ borderRadius: '15px' }}>
                  <IonLabel>Stones</IonLabel>
                  <IonRadio value="stone" color="tertiary" />
                </IonItem>
              </Col>
              <Col style={{ padding: '0px' }}>
                <IonItem style={{ borderRadius: '15px' }}>
                  <IonLabel>Pounds</IonLabel>
                  <IonRadio value="pounds" color="tertiary" />
                </IonItem>
              </Col>
            </Row>
          </Container>
        </IonRadioGroup>
      </IonContent>
      <FooterSubmitButton
        onSubmit={() => {
          console.log('Hi');
        }}
      />
    </IonPage>
  );
};

export default Weight;
