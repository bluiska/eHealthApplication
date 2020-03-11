const events = require('events');
const eventEmitter = new events.EventEmitter();
const Sensor = require('./models/Sensor');
const Logger = require('./singletons/Logger');

const fitbit = new Sensor("sensor1", "Fitbit");
// const fitbit2 = new Sensor("sensor2", "Fitbit2");
// const fitbit3 = new Sensor("sensor3", "Fitbit3");
const devices = [fitbit];

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
    .on('connectToSensor', async params => {
        const deviceId = params.id;
        const sensor = devices.find(x => x.id === deviceId);
        try {
            const deviceConnectionStatus = await sensor.connectToSensor();
            params.res.send(deviceConnectionStatus);
        } catch (err) {
            Logger.log(`Failed connecting to a device...`);
            params.res.send({deviceConnected: false});
        }
    })
    .on('disonnectSensor', params => {
        const deviceId = params.id;
        const sensor = devices.find(x => x.id === deviceId);
        sensor.disconnect();
        params.res.send(true);
    })

module.exports = eventEmitter;