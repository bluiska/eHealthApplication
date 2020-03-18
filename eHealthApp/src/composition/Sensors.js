import { ConnectionStatus } from "./SensorEnums";
import {
  timeBehaviors,
  stepsBehaviors,
  kcalBehaviors,
  hrBehaviors,
  locationBehaviors,
  stressBehaviors
} from "./SensorCompositions";

export const Sensor = (id, name, type) => {
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
  };

  const pair = () => {
    setTimeout(() => {
      if (!self.paired && !self.connected) {
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
  };
  const syncData = () => {
    if (self.connected && self.paired) {
      return self.activities;
    }
  };
  return Object.assign({}, self, {
    connect,
    pair,
    disconnect,
    unpair,
    syncData
  });
};

export const Fitbit = (id, name, type) => {
  const prototype = Sensor(id, name, type);
  return Object.assign(
    {},
    prototype,
    kcalBehaviors(prototype),
    stepsBehaviors(prototype),
    timeBehaviors(prototype)
  );
};

export const FitbitHR = (id, name, type) => {
  const prototype = Fitbit(id, name, type);
  return Object.assign({}, prototype, hrBehaviors(prototype));
};

export const Garmin = (id, name, type) => {
  const prototype = Sensor(id, name, type);
  return Object.assign(
    {},
    prototype,
    kcalBehaviors(prototype),
    timeBehaviors(prototype),
    locationBehaviors(prototype)
  );
};

export const Samsung = (id, name, type) => {
  const prototype = Sensor(id, name, type);
  return Object.assign(
    {},
    prototype,
    hrBehaviors(prototype),
    kcalBehaviors(prototype),
    locationBehaviors(prototype),
    stepsBehaviors(prototype),
    timeBehaviors(prototype),
    stressBehaviors(prototype)
  );
};

export const AppleWatch = (id, name, type) => {
  const prototype = Sensor(id, name, type);
  return Object.assign(
    {},
    prototype,
    locationBehaviors(prototype),
    hrBehaviors(prototype),
    kcalBehaviors(prototype),
    stepsBehaviors(prototype),
    timeBehaviors(prototype)
  );
};
