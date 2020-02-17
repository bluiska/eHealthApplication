const events = require('events');
const eventEmitter = new events.EventEmitter();
const Sensor = require('./sensorSimulation/models/Sensor');

eventEmitter
    .on('serverRunning', () => {
        console.log(`server running from Event Emitter`)
    })
    .on('connectToSensor', () => {
        const sensor1 = new Sensor("randomID", "Fitbit");
        sensor1.connectToSensor();
    })

module.exports = eventEmitter;