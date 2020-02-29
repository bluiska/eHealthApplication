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
import applicationState from "../data/applicationState";


/*
 *props:
 */
const Devices = props => {
	const [pairedDevices, setPairedDevices] = useState([]);
	const [shouldRerender, setShouldRerender] = useState(true);

	useEffect(() => {
		if (shouldRerender){
			console.log("will")
			getPairedDevices();
		}
	}, [shouldRerender]);

	const getPairedDevices = () => {
		BluetoothSynchronisationManager.getPairedDevices()
			.then((res) => {
				setPairedDevices(res);
			})
			.catch(err => {
				console.log("failed:: ", err);
				getPairedDevices();
			})
			setShouldRerender(false);
	};

	const deviceClickHandler = id => {

		BluetoothSynchronisationManager.connectToDevice(id)
		.then((res) => {
			console.log("Res: ", res);
			console.log("Paired: ", pairedDevices);
			setPairedDevices(res);
			// setShouldRerender(true);
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
