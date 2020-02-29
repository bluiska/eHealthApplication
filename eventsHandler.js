const events = require('events');
const eventEmitter = new events.EventEmitter();
const Sensor = require('./sensorSimulation/models/Sensor');
const Logger = require('./sensorSimulation/singletons/Logger');

const fitbit = new Sensor("sensor1", "Fitbit");
const fitbit2 = new Sensor("sensor2", "Fitbit2");
const fitbit3 = new Sensor("sensor3", "Fitbit3");
const devices = [fitbit, fitbit2, fitbit3];

eventEmitter
    .on('serverRunning', () => {
        console.log(`server running from Event Emitter`)
    })
    .on('onBluetoothDevicesRequest', response => {
        const devicesList = {
            devices: devices
        }
        response.send(devicesList);
    })
    .on('connectToSensor', () => {
        const sensor1 = new Sensor("randomID", "Fitbit");
        sensor1.connectToSensor();
    })

module.exports = eventEmitter;