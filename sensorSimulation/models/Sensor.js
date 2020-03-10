/**
 * Class used to create instances of a single bluetooth sensor
 * It consists all attributes and functions that the sensor should have
 * 
 */
const Logger = require('../singletons/Logger');
const DEVICE_CONNECTION_STATUS = require('../constants/DEVICE_CONNECTION_STATUS');
// Based on Kyle's Converter. Average length step is equal to 0.0008 km
const STEP_TO_KM_RATE = 0.0008;
// Based on a maximum bracket of burning 360 kcal per 5km walk
const KCAL_BY_M_RATE = 0.072;
// On average, during a brist walk heart beats between 110 to 120 bpm
const HEART_RATE_MIN = 110;
const HEART_RATE_MAX = 120;

class Sensor {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.batteryLevel = 100.00;
        this.connectionStatus = DEVICE_CONNECTION_STATUS.PAIRED;
        this.activityStatus = "IDLE";
        this.stepsCounter = 0;
        this.distance = 0;
        this.heartRate = 0;
        this.kcalBurnt = 0;
        this.connected = false;

        var stepCounterInterval;
        var heartRateInterval;
        var kcalBurntInterval;
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

    startMeasuringData() {
        if (this.stepCounterInterval) clearInterval(this.stepCounterInterval);
        if (this.heartRateInterval) clearInterval(this.heartRateInterval);
        if (this.kcalBurntInterval) clearInterval(this.kcalBurntInterval);

        this.stepCounterInterval = setInterval(() => {
            this.stepsCounter++;
            this.distance = this.stepsCounter * 0.0008;
            this.kcalBurnt = this.distance * 0.072;
        }, 2000);

        this.heartRateInterval = setInterval(() => {
            this.heartRate = Math.ceil(Math.random() * (HEART_RATE_MAX - HEART_RATE_MIN)) + HEART_RATE_MIN;
        }, 3000);
    }

    getSyncData() {
        return {
            stepsCounter: this.stepsCounter,
            distance: this.distance,
            kcalBurnt: this.kcalBurnt,
            heartRate: this.heartRate,
            timestamp: new Date(),
        }
    }
}

module.exports = Sensor;