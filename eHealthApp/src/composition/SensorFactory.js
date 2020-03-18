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
