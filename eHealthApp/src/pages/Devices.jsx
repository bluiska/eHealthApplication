/*
The page that displays the devices connected to the app.
If no devices are available, it allows the connection of a new device.
To be completed by Irek....

Author: Ireneusz Janusz
*/

// External dependencies
import React, { useState, useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import DeviceCard from "../components/DeviceCard";

// Internal dependencies
import BluetoothSynchronisationManager from '../bluetooth/managers/BluetoothSynchronisationManager';

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
	}, [])

	const getPairedDevices = () => {
		BluetoothSynchronisationManager.getPairedDevices()
			.then((res) => {
				setPairedDevices(res);
			})
			.catch(err => {
				console.log("failed:: ", err);
				getPairedDevices();
			})
	};

	const deviceClickHandler = id => {
		const connectingDevice = pairedDevices.find(device => device.id === id);
		console.log(connectingDevice);
		if (connectingDevice.connected) {
			setPairedDevices(() => {
				return changeDeviceStatus(id, "DISCONNECT")
			});
		}
		else {
			setPairedDevices(() => {
				return changeDeviceStatus(id, "CONNECTING");
			});

			BluetoothSynchronisationManager.connectToDevice(id)
				.then((res) => {
					setPairedDevices(() => {
						const connectingDevice = pairedDevices.find(device => device.id === id);
						connectingDevice.connect(res);
						const filteredPairedDevices = pairedDevices.filter(device => device.id !== id);
						filteredPairedDevices.push(connectingDevice);
						filteredPairedDevices.sort((a, b) => a.name.localeCompare(b.name));
						return filteredPairedDevices;
					})
				})
				.catch((res) => {
					setPairedDevices(() => {
						return changeDeviceStatus(id, "FAILED");
					})
				})
		}
	};

	const changeDeviceStatus = (id, status) => {
		const connectingDevice = pairedDevices.find(device => device.id === id);
		if (status === "CONNECTING") {
			connectingDevice.changeConnectionStatus(status);
		} else if (status === "DISCONNECT") {
			BluetoothSynchronisationManager.disconnect(id);
			connectingDevice.disconnect();
		} else if (status = "FAILED"){
			connectingDevice.failedToConnect();
		}
		const filteredPairedDevices = pairedDevices.filter(device => device.id !== id);
		filteredPairedDevices.push(connectingDevice);
		filteredPairedDevices.sort((a, b) => a.name.localeCompare(b.name));
		return filteredPairedDevices;
	};

	return (
		<IonPage>
			<BackButtonToolbar title="Devices" />
			<IonContent className="ion-padding">
				{pairedDevices.map(x => {
					return (
						<DeviceCard
							key={Math.random()}
							title={x.name}
							connected={x.connected}
							connectionStatus={x.connectionStatus}
							onClick={deviceClickHandler.bind(this, x.id)}
						/>
					)
				})}
			</IonContent>
		</IonPage>
	);
};

export default Devices;
