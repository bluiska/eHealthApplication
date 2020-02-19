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
		console.log("Calling devices only once");
		getPairedDevices();
	}, []);

	const getPairedDevices = () => {
		BluetoothSynchronisationManager.getPairedDevices()
		.then((res) => {
			setPairedDevices(res);
		})
		.catch(err => {
			console.log("failed:: ", err)
		})
	};

	const deviceClickHandler = id => {
		BluetoothSynchronisationManager.connectToDevice(id);
	};

	return (
		<IonPage>
			<BackButtonToolbar title="Devices" />
			<IonContent className="ion-padding">
				{pairedDevices.length === 0 ? null : pairedDevices.map(x => {
					return (
						<DeviceCard key={Math.random()} title={x.name} onClick={deviceClickHandler.bind(this, x.id)} />
					)
				})}
			</IonContent>
		</IonPage>
	);
};

export default Devices;
