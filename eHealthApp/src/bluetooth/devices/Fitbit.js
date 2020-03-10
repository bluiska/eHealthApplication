import IBluetoothEnabledDevice from "../interfaces/IBluetoothEnabledDevice";

class Fitbit extends IBluetoothEnabledDevice {
  constructor(
    id,
    name,
    batteryLevel,
    connectionStatus,
    activityStatus,
    connected,
    stepsCounter,
    heartRate,
    kcalBurnt
  ) {
    super(id, name, batteryLevel, connectionStatus, activityStatus, connected);
    this.stepsCounter = stepsCounter;
    this.heartRate = heartRate;
    this.kcalBurnt = kcalBurnt;
  }
}

export default Fitbit;
