const express = require('express');
const cors = require('cors');

const Logger = require('./singletons/Logger');
const eventEmitter = require('../eventsHandler');

const app = express();
const PORT = 3000;

app.use(cors());

app
    .get('/', (req, res) => {
        res.send("got here");
    })
    .get(`/getBluetoothDevices`, (req, res) => {
        Logger.log(`Someone requested devices`);
        eventEmitter.emit('onBluetoothDevicesRequest', res);
    })

app.listen(PORT, () => {
    Logger.log(`Server's listening on port ${PORT}`);
});

