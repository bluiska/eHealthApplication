const express = require('express');
const cors = require('cors');

const Logger = require('./singletons/Logger');
const SensorSimulation = require('./models/SensorSimulation');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    SensorSimulation.createData({id: "randId",randomData1: "randData1", randomData2: "randData2"});
    Logger.log(`Someone asked for data`);
    res.send("got here");
});

app.listen(PORT, () => {
    Logger.log(`Server's listening on port ${PORT}`);
});

