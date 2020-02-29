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

app.listen(PORT, () => {
    Logger.log(`Server's listening on port ${PORT}`);
});

