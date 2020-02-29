import React from "react";
import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { sync, checkmark } from 'ionicons/icons';

// styling
const cardContainer = {
    display: "flex"
};

const iconStyle = {
    fontSize: "30px",
    float: 'left'
};

const deviceNameStyle = {
    width: '100%',
    height: '100%',
    fontSize: '20px',
    textAlign: 'center',
}

const DeviceCard = props => {
    const { title, connected, onClick } = props;

    return (
        <IonCard style={{ marginTop: "10px" }} button={true} onClick={onClick}>
            <IonCardContent style={cardContainer}>
                    <IonIcon style={iconStyle} icon={connected ? checkmark : sync} />
                    <p style={deviceNameStyle}>{title}</p>
            </IonCardContent>
        </IonCard>
    )
}

export default DeviceCard;