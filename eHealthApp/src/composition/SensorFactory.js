/**
 * Encapsulated Factory Pattern function to create a sensor based on it's type
 * A Sensor is provided here, it's type, id and name are extracted and then
 * the relevant Sensor is created
 */

import { SensorTypes } from "./SensorEnums";
import { Fitbit, FitbitHR, Garmin, Samsung, AppleWatch } from "./Sensors";

export const createSensor = sensor => {
  const { id, name, type } = sensor;
  switch (type) {
    case SensorTypes.FITBIT:
      return Fitbit(id, name, type);
    case SensorTypes.FITBIT_HR:
      return FitbitHR(id, name, type);
    case SensorTypes.GARMIN:
      return Garmin(id, name, type);
    case SensorTypes.SAMSUNG:
      return Samsung(id, name, type);
    case SensorTypes.APPLE:
      return AppleWatch(id, name, type);
  }
};
