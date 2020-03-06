class IBluetoothEnabledDevice {
  constructor(id, name, batteryLevel, connectionStatus, connected) {
    this.id = id;
    this.name = name;
    this.batteryLevel = batteryLevel;
    this.connectionStatus = connectionStatus;
    this.connected = connected;

    this.someFunc = sth => {
      console.log(sth);
    };
  }

  connect = deviceConnectionStatus => {
    this.connected = true;
    this.connectionStatus = deviceConnectionStatus.connectionStatus;
  };

  changeConnectionStatus = status => {
    this.connectionStatus = status;
  };

  disconnect = () => {
    this.connected = false;
    this.connectionStatus = 'DISCONNECTED';
  };

  failedToConnect = () => {
    this.connected = false;
    this.connectionStatus = 'FAILED';
  };

  pair = () => {};

  synchronise = () => {};

  getName = () => {};

  getUniqueAddress = () => {};

  getConnectedState = () => {};
}

export default IBluetoothEnabledDevice;
