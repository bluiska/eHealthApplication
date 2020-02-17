/*
The page that displays the devices connected to the app.
If no devices are available, it allows the connection of a new device.
To be completed by Irek....

Author: Ireneusz Janusz
*/

// External dependencies
import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import DeviceCard from "../components/DeviceCard";

// Internal dependencies
import BluetoothSynchronisationManager from '../bluetooth/managers/BluetoothSynchronisationManager';

/*props:
 */
const Devices = props => {
	const [pairedDevices, setPairedDevices] = useState([]);
	const [initialLoad, setInitialLoad] = useState(false);

	const getPairedDevices = async () => {
		BluetoothSynchronisationManager.getPairedDevices()
		.then((res) => {
			setInitialLoad(true);
			setPairedDevices(res);
		})
		.catch(err => {
			console.log("failed:: ", err)
		})
	}

	if (!initialLoad){
		getPairedDevices();
	}

	return (
		<IonPage>
			<BackButtonToolbar title="Devices" />
			<IonContent className="ion-padding">
				{/* <DeviceCard title="Fitbit" content="hi"/>
				<DeviceCard title="Garmin" content="hi"/>
				<DeviceCard title="Samsung" content="hi"/> */}
				{pairedDevices.length === 0 ? null : pairedDevices.map(x => {
					return (
						<DeviceCard key={Math.random()} title={x.name} content="hi" />
					)
				})}
			</IonContent>
		</IonPage>
	);
};

export default Devices;
