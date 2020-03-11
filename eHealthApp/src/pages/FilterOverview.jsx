import React from "react";
import {
  IonPage,
  IonContent,
  IonFooter,
  IonButton,
  IonTitle,
  IonLabel,
  IonList,
  IonItem,
  IonCheckbox
} from "@ionic/react";

const FilterOverview = props => {
  const style = {
    label: {
      marginLeft: "20px"
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonList>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Blood pressure")}
              onClick={() => props.setSelectedFilterHandler("Blood pressure")}
              color="danger"
              value="Blood pressure"
            ></IonCheckbox>
            <IonLabel style={style.label}>Blood pressure</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Run")}
              onClick={() => props.setSelectedFilterHandler("Run")}
              color="primary"
              value="Run"
            ></IonCheckbox>
            <IonLabel style={style.label}>Run</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Walk")}
              onClick={() => props.setSelectedFilterHandler("Walk")}
              color="secondary"
              value="Walk"
            ></IonCheckbox>
            <IonLabel style={style.label}>Walk</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Cycle")}
              onClick={() => props.setSelectedFilterHandler("Cycle")}
              color="danger"
              value="Cycle"
            ></IonCheckbox>
            <IonLabel style={style.label}>Cycle</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Weight")}
              onClick={() => props.setSelectedFilterHandler("Weight")}
              color="primary"
              value="Weight"
            ></IonCheckbox>
            <IonLabel style={style.label}>Weight</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonButton
          size="large"
          expand="block"
          onClick={() => props.setDisplayFilter(false)}
        >
          <IonTitle>Apply</IonTitle>
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default FilterOverview;
