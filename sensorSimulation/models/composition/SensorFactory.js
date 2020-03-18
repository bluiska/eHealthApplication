const SensorTypes = require('./SensorTypes');
const SensorFunctions = require('./Functions');
const Logger = require('../../singletons/Logger');
const ConnectionStatus = require('./ConnectionStatus');

const {hasHR, hasKcal, hasLocation, hasSteps, hasStressLevel, hasTime} = SensorFunctions;

const Sensor = (id, name, type) => {
    const self = {
        id,
        name,
        type,
        connectionStatus: ConnectionStatus.NOT_PAIRED,
        batteryLevel: 0.0,
        connected: false,
        paired: false,
        data: {},
        activities: []
    }

    const pair = () => {
        setTimeout(() => {
            if (!self.paired && !self.connected){
                self.paired = true;
                self.connectionStatus = ConnectionStatus.PAIRED;
            }
        }, 3000);
    };
    const connect = () => {
        setTimeout(() => {
            if (!self.connected && self.paired) {
                self.connected = true;
                self.connectionStatus = ConnectionStatus.CONNECTED;
            }
        }, 3000);
    };
    const disconnect = () => {
        if (self.connected && self.paired) {
            self.connected = false;
            self.connectionStatus = ConnectionStatus.PAIRED;
        }
    };
    const unpair = () => {
        if (self.paired) {
            self.connected = false;
            self.paired = false;
            self.connectionStatus = ConnectionStatus.NOT_PAIRED;
        }
    }
    const syncData = () => {
        if (self.connected && self.paired) {
            return self.activities;
        }
    };
    return Object.assign({}, self, {connect, pair, disconnect, unpair, syncData})
}

const timeBehaviors = (state) => {
    const self = {
        ...state,
        measuringActivity: false,
        activities: [],
        activity: {},
        activityType: null,
        startTime: null,
        endTime: null,
        duration: null,
    }
    return Object.assign({}, self, hasTime(self));
}

const stepsBehaviors = (state) => {
    const self = {
        ...state,
        stepsCounter: -1,
        distance: -1,
        stepsCounterInterval: null
    }
    return Object.assign({}, self, hasSteps(self));
}

const kcalBehaviors = (state) => {
    const self = {
        ...state,
        kcalBurnt: -1
    }
    return Object.assign({}, self, hasKcal(self));
}

const hrBehaviors = (state) => {
    const self = {
        ...state,
        hearRate: -1
    }
    return Object.assign({}, self, hasHR(self));
}

const locationBehaviors = (state) => {
    const self = {
        ...state,
        latitude: -1,
        longitude: -1
    }
    return Object.assign({}, self, hasLocation(self));
}

const stressBehaviors = (state) => {
    const self = {
        ...state,
        stressLevel: -1
    }
    return Object.assign({}, self, hasStressLevel(self))
}

const Fitbit = (id, name, type) => {
    const prototype = Sensor(id, name, type);
    return Object.assign({}, prototype, kcalBehaviors(prototype), stepsBehaviors(prototype), timeBehaviors(prototype));
}

const FitbitHR = (id, name, type) => {
    const prototype = Fitbit(id, name, type);
    return Object.assign({}, prototype, hrBehaviors(prototype));
}

const Garmin = (id, name, type) => {
    const prototype = Sensor(id, name, type);
    return Object.assign({}, prototype, kcalBehaviors(prototype), timeBehaviors(prototype), locationBehaviors(prototype))
}

const Samsung = (id, name, type) => {
    const prototype = Sensor(id, name, type);
    return Object.assign({}, prototype, hrBehaviors(prototype), kcalBehaviors(prototype), locationBehaviors(prototype), stepsBehaviors(prototype), timeBehaviors(prototype), stressBehaviors(prototype))
}

const AppleWatch = (id, name, type) => {
    const prototype = Sensor(id, name, type);
    return Object.assign({}, prototype, locationBehaviors(prototype), hrBehaviors(prototype), kcalBehaviors(prototype), stepsBehaviors(prototype), timeBehaviors(prototype))
}

module.exports.createSensor = (id, name, type) => {
    switch(type) {
        case SensorTypes.FITBIT:
            Logger.log('Fitbit created');
            return Fitbit(id, name, type);
        case SensorTypes.FITBIT_HR:
            Logger.log('Fitbit_HR created');
            return FitbitHR(id, name, type);
        case SensorTypes.GARMIN:
            Logger.log('Garmin created');
            return Garmin(id, name, type);
        case SensorTypes.SAMSUNG:
            Logger.log('Samsung created');
            return Samsung(id, name, type);
        case SensorTypes.APPLE:
            Logger.log('Apple Watch created');
            return AppleWatch(id, name, type);
    }
};
