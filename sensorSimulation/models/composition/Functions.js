const moment = require('moment');
const ActivityTypes = require('./ActivityTypes');
const CONNECTION_STATUS = require('./ConnectionStatus');

const hasTime = (self) => ({
    startActivity(type) {
        console.log("started activity");
        if (!self.measuringActivity){
            self.measuringActivity = !self.measuringActivity;
            self.startTime = moment().format("HH:mm");

            switch(type.toLowerCase()) {
                case 'walking':
                    self.activityType = ActivityTypes.WALKING;
                    break;
                case 'running':
                    self.activityType = ActivityTypes.RUNNING;
                    break;
                case 'cycling':
                    self.activityType = ActivityTypes.CYCLING;
                    break;
            }
        }        
    },

    stopActivity() {
        if (self.measuringActivity){
            self.measuringActivity = !self.measuringActivity;
            self.endTime = moment().format("HH:mm");
            self.duration = moment.utc(moment(self.endTime).diff(moment(self.startTime))).format("HH:mm:ss");
            self.activities.push(new Activity());
        }
        cleanActivities();
    },

    cleanActivities() {
        if (self.measuringActivity) self.measuringActivity = false;
        if (self.activity) self.activity = null;
        if (self.activityType) self.activityType = null;
        if (self.startTime) self.startTime = null;
        if (self.endTime) self.endTime = null;
        if (self.duration) self.duration = null;
    }
});

const hasSteps = (self) => ({

    startStepsCounter(){
        
    }
});

const hasConnectivity = (self) => ({
    pair(self){
        return new Promise((resolve, reject) => {
          if (!self.paired) self.paired = true;
          self.connectionStatus = CONNECTION_STATUS.PAIRED;
          const status = {
            paired: self.paired,
            connectionStatus: self.connectionStatus
          }
          resolve(status)
        })
      },

      connect(self){
        return new Promise((resolve, reject) => {
          if (self.paired && !self.connected) self.connected = true;
          self.connectionStatus = CONNECTION_STATUS.CONNECTED;
          const status = {
            connected: self.connected,
            connectionStatus: self.connectionStatus
          }
          resolve(status);
        })
      },
    
      disconnect(self){
        if (self.paired && self.connected) {
          self.connected = false;
          self.connectionStatus = CONNECTION_STATUS.PAIRED;
        }
      },
    
      unpair(self) {
        if (self.paired) {
          self.paired = false;
          self.connectionStatus = CONNECTION_STATUS.DISCONNECTED;
        }
      },
    
      syncData(newData){
        return new Promise((resolve, reject) => {
          if (self.connected && self.paired) {
            self.data = [
              ...self.data,
              newData
            ]
            resolve([]);
          }
        })
      },
})
const hasKcal = () => ({});
const hasHR = () => ({});
const hasLocation = () => ({});
const hasStressLevel = () => ({});

module.exports = {
    hasConnectivity,
    hasSteps,
    hasTime,
    hasKcal,
    hasHR,
    hasLocation,
    hasStressLevel,
}