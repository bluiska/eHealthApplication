const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Logger = require('./singletons/Logger');
const eventEmitter = require('../eventsHandler');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app
    .get('/', (req, res) => {
        res.send("got here");
    })
    .get(`/getBluetoothDevices`, (req, res) => {
        Logger.log(`Someone requested devices`);
        eventEmitter.emit('onBluetoothDevicesRequest', res);
    })
    .post(`/synchroniseData`, (req, res) => {
        if (req) {
            console.log(req.body)
        }
    })
    .post(`/connectDevice`, (req, res) => {
        if (req && req.body) {
            const deviceId = req.body.id;
            eventEmitter.emit('connectToSensor', {id: deviceId, res: res});
        }
    })
    .post(`/disconnectDevice`, (req, res) => {
        if (req && req.body) {
            const deviceId = req.body.id;
            eventEmitter.emit(`disconnectSensor`, {id: deviceId, res: res});
        }
    })

app.listen(PORT, () => {
    Logger.log(`Server's listening on port ${PORT}`);
});

