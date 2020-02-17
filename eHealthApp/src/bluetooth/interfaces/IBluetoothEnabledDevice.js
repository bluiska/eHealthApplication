class IBluetoothEnabledDevice {
    constructor() {
        this.batteryLevel = 100.00;
        this.connectionStatus = "IDLE";
        this.activityStatus = "IDLE";
        this.stepsCounter = 0;
        this.heartRate = 0;
        this.kcalBurnt = 0;
        this.connected = false;
    }

    connect = () => {

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