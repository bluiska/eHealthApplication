/**
 * Class used to create instances of a single bluetooth sensor
 * It consists all attributes and functions that the sensor should have
 * 
 */
const Logger = require('../singletons/Logger');

class Sensor {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.batteryLevel = 100.00;
        this.connectionStatus = "IDLE";
        this.activityStatus = "IDLE";
        this.stepsCounter = 0;
        this.heartRate = 0;
        this.connected = false;
    }

    connectToSensor = () => {
        Logger.log(`Connecting to ${this.name}`);
        if (this.connected) {
            Logger.log(`Fitness tracker already connected to another device.`);
            return;
        } else {
            this.connected = !this.connected;
            Logger.log(`Successfully connected to ${this.name}`);
        }

    }
}

module.exports = Sensor;