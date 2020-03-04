/**
 * Class used to create instances of a single bluetooth sensor
 * It consists all attributes and functions that the sensor should have
 * 
 */
const Logger = require('../singletons/Logger');
const DEVICE_CONNECTION_STATUS = require('../constants/DEVICE_CONNECTION_STATUS');

class Sensor {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.batteryLevel = 100.00;
        this.connectionStatus = DEVICE_CONNECTION_STATUS.PAIRED;
        this.activityStatus = "IDLE";
        this.stepsCounter = 0;
        this.heartRate = 0;
        this.kcalBurnt = 0;
        this.connected = false;
    }

    connectToSensor() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const deviceConnectionData = {
                    connected: this.connected,
                    connectionStatus: this.connectionStatus
                }
                // Logger.log(`Connecting to ${this.name}`);
                if (this.connected) {
                    // Logger.log(`Fitness tracker already connected to another device.`);
                    // this.connectionStatus = DEVICE_CONNECTION_STATUS.DISCONNECTED;
                    this.connected = !this.connected;
                    const deviceConnectionData = {
                        connected: this.connected,
                        connectionStatus: this.connectionStatus
                    } 
                    resolve(deviceConnectionData);
                    return;
                } else if (this.connected === false && this.batteryLevel > 0) {
                    this.connectionStatus = DEVICE_CONNECTION_STATUS.CONNECTING;
                    this.connected = !this.connected;
                    // Logger.log(`Status: ${this.connected}`);
                    this.connectionStatus = this.connected ? DEVICE_CONNECTION_STATUS.CONNECTED : DEVICE_CONNECTION_STATUS.PAIRED;
                    // Logger.log(`Successfully connected to ${this.name}`);
                    const deviceConnectionData = {
                        connected: this.connected,
                        connectionStatus: this.connectionStatus
                    }
                    resolve(deviceConnectionData);
                    return;
                } else {
                    reject();
                }  
            }, 3000);

        })
    }

    disconnect() {
        this.connected = false;
        this.connectionStatus = "DISCONNECTED";
    }
}

module.exports = Sensor;