const Logger = require('../singletons/Logger');
const SensorData = require('../data/SensorData');

class SensorSimulation {
    constructor(){
        Logger.log(`SensorSimulation created`)
    }

    createData(data) {
        const sensorData = new SensorData(data);
        sensorData.showTheMoney();
    }
}

module.exports = new SensorSimulation();