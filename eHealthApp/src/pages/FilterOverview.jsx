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
  IonCheckbox,
  IonRadioGroup,
  IonRadio,
  IonListHeader
} from "@ionic/react";

const FilterOverview = props => {
  const style = {
    label: {
      marginLeft: "20px"
    }
  };
  const todaysDate = new Date();
  const date = new Date(todaysDate.toDateString());

  let sevenDaysDate = new Date(date);
  sevenDaysDate.setDate(date.getDate() - 7);

  let fourteenDaysDate = new Date(date);
  fourteenDaysDate.setDate(date.getDate() - 14);

  let thirtyDaysDate = new Date(date);
  thirtyDaysDate.setDate(date.getDate() - 30);

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonList>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("BloodPressureReading")}
              onClick={() =>
                props.setSelectedFilterHandler("BloodPressureReading")
              }
              color="danger"
              value="BloodPressureReading"
            ></IonCheckbox>
            <IonLabel style={style.label}>Blood pressure</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Running")}
              onClick={() => props.setSelectedFilterHandler("Running")}
              color="primary"
              value="Running"
            ></IonCheckbox>
            <IonLabel style={style.label}>Run</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Walking")}
              onClick={() => props.setSelectedFilterHandler("Walking")}
              color="secondary"
              value="Walking"
            ></IonCheckbox>
            <IonLabel style={style.label}>Walk</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Cycling")}
              onClick={() => props.setSelectedFilterHandler("Cycling")}
              color="danger"
              value="Cycling"
            ></IonCheckbox>
            <IonLabel style={style.label}>Cycle</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("WeightReading")}
              onClick={() => props.setSelectedFilterHandler("WeightReading")}
              color="primary"
              value="WeightReading"
            ></IonCheckbox>
            <IonLabel style={style.label}>Weight</IonLabel>
          </IonItem>
        </IonList>

        <IonList>
          <IonRadioGroup
            value={props.selectedDateFilter}
            onClick={e => props.setSelectedDateFilterHandler(e.target.value)}
          >
            <IonListHeader>
              <IonLabel>Upload Date</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonRadio slot="start" value={sevenDaysDate} />
              <IonLabel>Last 7 days</IonLabel>
            </IonItem>

            <IonItem>
              <IonRadio slot="start" value={fourteenDaysDate} />
              <IonLabel>Last 14 days</IonLabel>
            </IonItem>

            <IonItem>
              <IonRadio slot="start" value={thirtyDaysDate} />
              <IonLabel>Last 30 days</IonLabel>
            </IonItem>
          </IonRadioGroup>
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
