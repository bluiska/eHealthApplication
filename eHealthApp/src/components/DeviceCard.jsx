import React from "react";
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonImg } from "@ionic/react";
import Fitbit from '../resources/fitbit.jpg';

// styling
const imageStyle = {
    width: '100px',
    height: '88px',
    padding: "5px"
};

const cardContainer = {
    textAlign: 'left'
}

const DeviceCard = props => {
    const {title, content} = props;
    const imageUrl = "../resources/" + title + ".jpg";
    return (
        <IonCard style={{marginTop: "10px"}} button={true} onClick={() => console.log(title)}>
            {/* <IonCardHeader>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader> */}
            <IonCardContent style={cardContainer}>
                <img align="right" style={imageStyle} src={require(`../../public/assets/images/bluetooth/${title}.jpg`)} />
                <p style={{fontSize: "20px"}}>{title}</p>
            </IonCardContent>
        </IonCard>
    )
}

export default DeviceCard;