import Fitbit from "../devices/Fitbit";

const PORT = 3000;
const URL = `localhost`;
const getBluetoothDevicesUrl = `http://${URL}:${PORT}/getBluetoothDevices/`;
const connectDevice = `http://${URL}:${PORT}/connectDevice/`;
const disconnectDevice = `http://${URL}:${PORT}/disconnectDevice/`;
const synchorniseDataUrl = `http://${URL}:${PORT}/synchroniseData/`;
let foundDevices = [];

class BluetoothSynchronisationManager {
  getPairedDevices = async () => {
    /**
     * Returns the list of available paired devices
     */
    if (foundDevices.length === 0) {
      try {
        const result = await fetch(getBluetoothDevicesUrl);
        const data = await result.json();
        const devices = data.devices;
        for (const x in devices) {
          const {
            id,
            name,
            batteryLevel,
            connectionStatus,
            activityStatus,
            connected,
            stepsCounter,
            heartRate,
            kcalBurnt
          } = devices[x];
          const bluetoothDevice = new Fitbit(
            id,
            name,
            batteryLevel,
            connectionStatus,
            activityStatus,
            connected,
            stepsCounter,
            heartRate,
            kcalBurnt
          );
          foundDevices.push(bluetoothDevice);
          foundDevices = [...new Set(foundDevices)];
        }
        return foundDevices;
      } catch (err) {
        throw new Error(err);
      }
    }
    return foundDevices;
  };

  getConnectedDevices = () => {
    /**
     * Returns the list of connected devices
     */
    return {};
  };

  connectToDevice = id => {
    /**
     * Connect to one device
     */
    return new Promise(async (resolve, reject) => {
      const connectingDevice = foundDevices.find(device => device.id === id);
      if (connectingDevice) {
        try {
          const response = await fetch(connectDevice, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
          });
          const data = await response.json();
          if (data) {
            resolve(data);
          } else {
            reject();
          }
        } catch (err) {
          // Device is disconnected (Simulation server not running)
          const deviceConnectionStatus = {
            connected: false,
            connectionStatus: "FAILED"
          };
          reject(deviceConnectionStatus);
        }
      }
    });
  };

  disconnect = id => {
    fetch(disconnectDevice, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });
  };

  synchroniseData = params => {
    /**
     * Asks for data
     */
    foundDevices.forEach(async device => {
      try {
        let fetchData = {
          id: device.id
        };
        const response = await fetch(synchorniseDataUrl, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(fetchData)
        });
        const data = await response.json();
      } catch (err) {
        console.log(err.message);
      }
    });
  };
}

export default new BluetoothSynchronisationManager();
