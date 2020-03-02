import React from 'react'
import { IonPage, 
        IonContent,
        IonFooter,
        IonButton,
        IonTitle, 
        IonLabel,
        IonList,
        IonListHeader,
        IonItem,
        IonCheckbox} from '@ionic/react'

const FilterOverview = props => {
    return(
        <IonPage>
            <IonContent className="ion-padding">
                <IonList>
                    {/* <IonListHeader>Filter by</IonListHeader> */}
                    <IonItem>
                        <IonCheckbox color="danger" value="Blood pressure"></IonCheckbox>
                        <IonLabel>Blood pressure</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonCheckbox value="Run"></IonCheckbox>
                        <IonLabel>Run</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonCheckbox value="Walk"></IonCheckbox>
                        <IonLabel>Walk</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonCheckbox value="Cycle"></IonCheckbox>
                        <IonLabel>Cycle</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonCheckbox value="Weight"></IonCheckbox> 
                        <IonLabel>Weight</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
            <IonFooter>
                <IonButton size="large" expand="block" onClick={() => props.setDisplayFilter(false)}>
                    <IonTitle>Apply</IonTitle>
                </IonButton>
            </IonFooter>
        </IonPage>
    )
}

export default FilterOverview;



				{/* <IonLabel>Filter by</IonLabel> */}
				{/* Open as seperate component */}
				{/* <IonSelect multiple={true}>
					<IonSelectOption>Blood pressure</IonSelectOption>
					<IonSelectOption>Run</IonSelectOption>
					<IonSelectOption>Walk</IonSelectOption>
					<IonSelectOption>Cycle</IonSelectOption>
					<IonSelectOption>Weight</IonSelectOption>
				</IonSelect> */}