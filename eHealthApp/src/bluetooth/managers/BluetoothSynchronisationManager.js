import PAIRED_DEVICES from '../../data/paired_devices';
import ODataClient from '../../utilities/odataClient';

const PORT = 3000;
const URL = `localhost`;
const connectDevice = `http://${URL}:${PORT}/connectDevice/`;
const disconnectDevice = `http://${URL}:${PORT}/disconnectDevice/`;
const synchorniseDataUrl = `http://${URL}:${PORT}/synchroniseData/`;
let foundDevices = [];

class BluetoothSynchronisationManager {
  getPairedDevices = () => {
    foundDevices = PAIRED_DEVICES;
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
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
          });
          const data = await response.json();
          console.log('attempted connection and got: ', data);
          if (data) {
            resolve(data);
            return;
          } else {
            reject();
            return;
          }
        } catch (err) {
          // Device is disconnected (Simulation server not running)
          // const deviceConnectionStatus = {
          //   connected: false,
          //   connectionStatus: 'FAILED'
          // };
          // reject(deviceConnectionStatus);
          reject();
          return;
        }
      }
    });
  };

  disconnect = id => {
    fetch(disconnectDevice, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });
  };

  synchroniseData = () => {
    /**
     * Asks for data
     */
    foundDevices.forEach(async device => {
      if (device.connected){
        console.log("attempting to fetch data");
        try {
          let fetchData = {
            id: device.id
          };
          const response = await fetch(synchorniseDataUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchData)
          });
          const data = await response.json();
          console.log("data: ", data);
          const { stepsCounter, distance, kcalBurnt, heartRate } = data;
          // SEND DATA TO THE DATABASE
          // ODataClient.IssueODataRequest({
          //   "requestType": "POST",
          //   "entityType": "Walkings",
          //   "entitiyBody": {
          //     "steps": stepsCounter
          //   }
          // })
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };
}

export default new BluetoothSynchronisationManager();
