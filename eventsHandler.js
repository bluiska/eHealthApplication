const events = require('events');
const eventEmitter = new events.EventEmitter();
const Sensor = require('./sensorSimulation/models/Sensor');
const Logger = require('./sensorSimulation/singletons/Logger');

eventEmitter
    .on('serverRunning', () => {
        console.log(`server running from Event Emitter`)
    })
    .on('onBluetoothDevicesRequest', response => {
        console.log("hi");
        const fitbit = new Sensor("sensor1", "fitbit");
        const fitbit2 = new Sensor("sensor4", "fitbit");
        const garmin = new Sensor("sensor2", "garmin");
        const garmin2 = new Sensor("sensor5", "garmin");
        const samsung = new Sensor("sensor3", "samsung");
        const samsung2 = new Sensor("sensor6", "samsung");
        let devicesList = {
            devices: [fitbit, fitbit2, garmin, garmin2, samsung, samsung2]
        };
        response.send(devicesList);
    })
    .on('connectToSensor', () => {
        const sensor1 = new Sensor("randomID", "Fitbit");
        sensor1.connectToSensor();
    })

module.exports = eventEmitter;