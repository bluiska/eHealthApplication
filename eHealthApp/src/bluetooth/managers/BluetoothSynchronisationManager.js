import PAIRED_DEVICES from "../../data/paired_devices";
import Exercise from "../../models/Exercise";
import ActivityQueries from '../../queries/ActivityQueries';

const PORT = 3000;
const URL = `localhost`;
const connectDevice = `http://${URL}:${PORT}/connectDevice/`;
const disconnectDevice = `http://${URL}:${PORT}/disconnectDevice/`;
const synchorniseDataUrl = `http://${URL}:${PORT}/synchroniseData/`;
let foundDevices = [];

class BluetoothSynchronisationManager {
  constructor() {
    setInterval(() => {
      this.synchroniseData();
    }, 3000);
  }
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
      console.log(`clicked on ${id}`)
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
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });
  };

  synchroniseData = () => {
    /**
     * Asks for data
     */
    foundDevices.forEach(async device => {
      if (device.connected) {
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

          if (data.length !== 0) {
            data.forEach(log => {
              const {type, stepsCounted, kcalBurnt, startTime, stopTime, distance} = log;
              const newExercise = new Exercise(type, stepsCounted, kcalBurnt, startTime, stopTime, distance);
              ActivityQueries.uploadNewExercise(0, newExercise)
            })
            // SEND DATA TO THE DATABASE
            // try {
            //   await client.IssueODataRequest({
            //     requestType: "POST",
            //     entityType: "Walkings",
            //     entityBody: {
            //       steps: stepsCounter,
            //       caloriesBurnt: kcalBurnt,
            //       distance: distance
            //     }
            //   });
            // } catch (err) {}
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };
}

export default new BluetoothSynchronisationManager();
