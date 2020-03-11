/*
The page that displays the devices connected to the app.
If no devices are available, it allows the connection of a new device.
To be completed by Irek....

Author: Ireneusz Janusz
*/

// External dependencies
import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonLabel, IonItem } from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import DeviceCard from "../components/DeviceCard";

// Internal dependencies
import BluetoothSynchronisationManager from "../bluetooth/managers/BluetoothSynchronisationManager";

// Styling
const styles = {
  labelContainer: {
    height: "100%",
    display: "flex"
  },
  noDevicesLabel: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: "30px"
  }
};

/*
 *props:
 */
const Devices = props => {
  const [pairedDevices, setPairedDevices] = useState([]);

  useEffect(() => {
    getPairedDevices();

    const synchronisationListener = setInterval(() => {
      // console.log("it lives");
    }, 5000);
  }, []);

  const getPairedDevices = () => {
    BluetoothSynchronisationManager.getPairedDevices()
      .then(res => {
        setPairedDevices(res);
      })
      .catch(err => {
        console.log("failed:: ", err);
        getPairedDevices();
      });
  };

  const deviceClickHandler = id => {
    const connectingDevice = pairedDevices.find(device => device.id === id);
    if (connectingDevice.connected) {
      setPairedDevices(() => {
        return changeDeviceStatus(id, "DISCONNECT");
      });
    } else {
      setPairedDevices(() => {
        return changeDeviceStatus(id, "CONNECTING");
      });

      BluetoothSynchronisationManager.connectToDevice(id)
        .then(res => {
          setPairedDevices(() => {
            const connectingDevice = pairedDevices.find(
              device => device.id === id
            );
            connectingDevice.connect(res);
            const filteredPairedDevices = pairedDevices.filter(
              device => device.id !== id
            );
            filteredPairedDevices.push(connectingDevice);
            filteredPairedDevices.sort((a, b) => a.name.localeCompare(b.name));
            return filteredPairedDevices;
          });
        })
        .catch(res => {
          setPairedDevices(() => {
            return changeDeviceStatus(id, "FAILED");
          });
        });
    }
  };

  /**
   * Changes the device's connection status using React Hooks
   * Function has been encapsulated as it repeats quite often in this component
   * In order to successfuly rerender the component,
   * the device we are updating has to be removed from the devices array,
   * added back again and then array has to be sorted alphabetically
   * @param {String} id - ID of device
   * @param {String} status - Connection status of the device
   */
  const changeDeviceStatus = (id, status) => {
    const connectingDevice = pairedDevices.find(device => device.id === id);
    if (status === "CONNECTING") {
      connectingDevice.changeConnectionStatus(status);
    } else if (status === "DISCONNECT") {
      BluetoothSynchronisationManager.disconnect(id);
      connectingDevice.disconnect();
    } else if (status === "FAILED") {
      connectingDevice.failedToConnect();
    }
    const filteredPairedDevices = pairedDevices.filter(
      device => device.id !== id
    );
    filteredPairedDevices.push(connectingDevice);
    filteredPairedDevices.sort((a, b) => a.name.localeCompare(b.name));
    return filteredPairedDevices;
  };

  return (
    <IonPage>
      <BackButtonToolbar title="Devices" />
      <IonContent className="ion-padding">
        {pairedDevices.length > 0 ? (
          pairedDevices.map(x => {
            return (
              <DeviceCard
                key={x.id}
                title={x.name}
                connected={x.connected}
                connectionStatus={x.connectionStatus}
                onClick={deviceClickHandler.bind(this, x.id)}
              />
            );
          })
        ) : (
          <IonItem lines="none" style={styles.labelContainer}>
            <IonLabel style={styles.noDevicesLabel}>No devices found</IonLabel>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Devices;
