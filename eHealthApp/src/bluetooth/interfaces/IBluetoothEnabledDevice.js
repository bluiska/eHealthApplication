import AppState from '../../data/applicationState';

class IBluetoothEnabledDevice {
    constructor(id, name, batteryLevel, connectionStatus, activityStatus, connected) {
        this.id = id;
        this.name = name;
        this.batteryLevel = batteryLevel;
        this.connectionStatus = connectionStatus;
        this.activityStatus = activityStatus;
        this.connected = connected;
    }

    connect = () => {
        console.log("got here")
        this.connected = !this.connected;
    };

    disconnect = () => {

    };

    pair = () => {

    };

    synchronise = () => {

    };

    getName = () => {

    };

    getUniqueAddress = () => {

    };

    getConnectedState = () => {

    }
}

export default IBluetoothEnabledDevice;