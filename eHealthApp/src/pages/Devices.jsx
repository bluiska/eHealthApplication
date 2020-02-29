/*
The page that displays the devices connected to the app.
If no devices are available, it allows the connection of a new device.
To be completed by Irek....

Author: Ireneusz Janusz
*/

// External dependencies
import React, { useState, useEffect, useCallback } from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
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
			BluetoothSynchronisationManager.synchroniseData();
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
		BluetoothSynchronisationManager.connectToDevice(id)
		.then((res) => {
			// METHOD 1 - WITH FLICKERING
			setPairedDevices(() => {
				const connectingDevice = pairedDevices.find(device => device.id === id);
				connectingDevice.connect();
				const filteredPairedDevices = pairedDevices.filter(device => device.id !== id);
				filteredPairedDevices.push(connectingDevice);
				filteredPairedDevices.sort((a, b) => a.name.localeCompare(b.name));
				return filteredPairedDevices;
			})
		})
	};

	return (
		<IonPage>
			<BackButtonToolbar title="Devices" />
			<IonContent className="ion-padding">
				{pairedDevices.map(x => {
					console.log("rendered: ", x);
					return (
						<DeviceCard key={Math.random()} title={x.name} connected={x.connected} onClick={deviceClickHandler.bind(this, x.id)} />
					)
				})}
			</IonContent>
		</IonPage>
	);
};

export default Devices;
