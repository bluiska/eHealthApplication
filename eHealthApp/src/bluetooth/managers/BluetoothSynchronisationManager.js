import { heart } from 'ionicons/icons';

import Fitbit from '../devices/Fitbit';
import ApplicationState from '../../data/applicationState';

const PORT = 3000;
const URL = `localhost`;
const getBluetoothDevicesUrl = `http://${URL}:${PORT}/getBluetoothDevices/`;
let foundDevices = [];

class BluetoothSynchronisationManager {
    getPairedDevices = async () => {
        /**
        * Returns the list of available paired devices
        */
        const previouslyPairedDevices = ApplicationState.getPairedDevices();

        if (previouslyPairedDevices.length === 0) {
            try {
                const result = await fetch(getBluetoothDevicesUrl);
                const data = await result.json();
                const devices = data.devices;
                for (const x in devices) {
                    const { id, name, batteryLevel, connectionStatus, activityStatus, connected, stepsCounter, heartRate, kcalBurnt } = devices[x];
                    const bluetoothDevice = new Fitbit(
                        id,
                        name,
                        batteryLevel,
                        connectionStatus,
                        activityStatus,
                        connected,
                        stepsCounter,
                        heartRate,
                        kcalBurnt
                    );
                    foundDevices.push(bluetoothDevice);
                    foundDevices = [...new Set(foundDevices)];
                    ApplicationState.savePairedDevices(foundDevices);
                }
                return foundDevices;
            } catch (err) {
                throw new Error(err);
            }
        }
        return previouslyPairedDevices;
    };

    getConnectedDevices = () => {
        /**
         * Returns the list of connected devices
         */
        return {};
    };

    connectToDevice = id => {
        /**
         * Connect to one device
         */
        const connectToDevice = `http://${URL}:${PORT}/connectDevice/${id}`;
        const clickedDevice = foundDevices.find(x => x.id === id);
        console.log("Someone clicked on: ", clickedDevice.id);
        console.log("trying to connect...");
        clickedDevice.connect();
        return true;
    };

    synchroniseData = (params) => {
        /**
         * Asks for data
         */
        return true;
    }

};

export default new BluetoothSynchronisationManager();