import Fitbit from "../bluetooth/devices/Fitbit";

const PAIRED_DEVICES = [
  new Fitbit("sensor1", "Fitbit", 100.0, "PAIRED", false),
  new Fitbit("sensor2", "Fitbit2", 100.0, "PAIRED", false)
];

export default PAIRED_DEVICES;
