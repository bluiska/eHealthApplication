import React from "react";
import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { sync, checkmark } from "ionicons/icons";

const styles = {
  cardContainer: {
    display: "flex",
    width: "100%"
  },
  iconStyle: {
    width: "100%",
    marginLeft: "-55px",
    fontSize: "30px",
    textAlign: "left"
  },
  deviceNameStyle: {
    width: "100%",
    height: "100%",
    fontSize: "20px",
    textAlign: "center"
  },
  deviceConnectionStatus: {
    width: "100%",
    height: "100%",
    fontSize: "20px",
    textAlign: "right"
  }
};

const DeviceCard = props => {
  const { title, connected, connectionStatus, onClick } = props;

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case "CONNECTED":
        return "var(--ion-color-success)";
      case "CONNECTING":
        return "var(--ion-color-warning)";
      case "UNKNOWN":
        return "var(--ion-color-warning)";
      case "PAIRED":
        return "var(--ion-color-success)";
      case "PAIRING":
        return "var(--ion-color-warning)";
      default:
        return "var(--ion-color-danger)";
    }
  };

  return (
    <IonCard style={{ marginTop: "10px" }} button={true} onClick={onClick}>
      <IonCardContent style={styles.cardContainer}>
        <IonIcon style={styles.iconStyle} icon={connected ? checkmark : sync} />
        <p style={styles.deviceNameStyle}>{title.toUpperCase()}</p>
        <p
          style={{
            ...styles.deviceConnectionStatus,
            color: getConnectionColor()
          }}
        >
          {connectionStatus}
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default DeviceCard;
