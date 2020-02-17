import Fitbit from '../devices/Fitbit';

const PORT = 3000;
const URL = `localhost`;
const getBluetoothDevicesUrl = `http://${URL}:${PORT}/getBluetoothDevices/`;

class BluetoothSyncrhonisationManager {

    getPairedDevices = async () => {
        /**
         * Returns the list of available paired devices
         */
        try {
            const result = await fetch(getBluetoothDevicesUrl);
            const data = await result.json();
            const devices = data.devices;y
            let devicesArray = [];
            for (const x in devices) {
                const bluetoothDevice = new Fitbit(
                    devices[x].id,
                    devices[x].name
                );
                devicesArray.push(bluetoothDevice);
            }
            return devicesArray;
        } catch (err) {
            throw new Error(err);
        }
    };

    getConnectedDevices = () => {
        /**
         * Returns the list of connected devices
         */
        return {};
    };

    connectToDevice = (params) => {
        /**
         * Connect to one device
         */
        return true;
    };

    synchroniseData = (params) => {
        /**
         * Asks for data
         */
        return true;
    }

};

export default new BluetoothSyncrhonisationManager();