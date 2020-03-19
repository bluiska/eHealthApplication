import { ConnectionStatus } from "./SensorEnums";
import {
  connectivityBehaviors,
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
    data: [],
    activities: []
  };

  return Object.assign({}, self, connectivityBehaviors(self));
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
