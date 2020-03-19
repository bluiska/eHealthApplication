const events = require('events');
const eventEmitter = new events.EventEmitter();
const Sensor = require('./models/Sensor');
const Logger = require('./singletons/Logger');
const SensorFactory = require('./models/composition/SensorFactory');

const fitbit = new Sensor("sensor1", "Fitbit");
// const fitbit2 = new Sensor("sensor2", "Fitbit2");
// const fitbit3 = new Sensor("sensor3", "Fitbit3");
const devices = [fitbit];

const fit = SensorFactory.createSensor('sensor3', 'Fitbit', 'fitbit');
const fit_hr = SensorFactory.createSensor('sensor4', 'Fitbit_HR', 'fitbit_hr');
const garmin = SensorFactory.createSensor('sensor5', 'Garmin', 'garmin');
const samsung = SensorFactory.createSensor('sensor6', 'Samsung', 'samsung');
const apple_watch = SensorFactory.createSensor('sensor7', 'Apple Watch', 'apple');

var pairedDevices = [];
var otherDevices = [fit, fit_hr, garmin, samsung, apple_watch]

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
    .on('onOtherDevicesRequest', res => {
        res.status(200).send(otherDevices)
    })
    .on('pairSensor', async params => {
        Logger.log(`Pairing with #${params.id}`);
        const deviceId = params.id;
        const sensor = otherDevices.find(x => x.id === deviceId);
        try {
            const deviceConnectionStatus = await sensor.pair(sensor);
            pairedDevices.push(sensor);
            otherDevices = otherDevices.filter(device => {
                console.log(device.id !== deviceId);
                return device.id !== deviceId
            });
            params.res.status(200).send(deviceConnectionStatus);
        } catch(err) {
            setTimeout(() => {
                params.res.status(400).send(false);
            }, 2000);
        }
    })
    .on('connectToSensor', async params => {
        Logger.log(`Connecting to a sensor`);
        const deviceId = params.id;
        const sensor = pairedDevices.find(x => x.id === deviceId);
        try {
            const deviceConnectionStatus = await sensor.connect(sensor);
            params.res.send(deviceConnectionStatus);
        } catch (err) {
            console.log(err);
            setTimeout(() => {
            params.res.send(false);
            }, 3000);
        }
    })
    .on('disconnectSensor', params => {
        Logger.log(`Disconnecting from a sensor`);
        const deviceId = params.id;
        const sensor = pairedDevices.find(x => x.id === deviceId);
        sensor.disconnect(sensor);
        params.res.send(true);
    })
    .on('syncData', async params => {
        const bluetoothDevice = pairedDevices.find(x => x.id === params.id);
        if (bluetoothDevice.connected) {
            const syncData = await bluetoothDevice.syncData();
            params.res.send(syncData);
        }
    })
    .on('startActivity', params => {
        devices.forEach(device => {
            if (device.connected && !device.measuringActivity){
                Logger.log(`[INFO] Device #${device.id} started an activity`)
                if (params.type) {
                    device.startActivity(params.type)
                    device.measuringActivity = !device.measuringActivity
                } else {
                    Logger.log(`[ERROR] StartActivity - Activity type not provided`)
                }
            } else {
                Logger.log(`[INFO] Device #${device.id} is ${device.connected} == ${device.measuringActivity}`)
            }
        })
        params.res.status(200).send(true)
    })
    .on('stopActivity', params => {
        devices.forEach(device => {
            if (device.connected && device.measuringActivity) {
                Logger.log(`[INFO] Device #${device.id} stopped an activity`)
                device.stopActivity()
                device.measuringActivity = !device.measuringActivity
                console.log("[INFO] Activities: ", device.activities)
            }
        })
        params.res.status(200).send(true)
    })

module.exports = eventEmitter;