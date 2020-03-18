const moment = require('moment');
const ActivityTypes = require('./ActivityTypes');

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

    startStepsCounter: () => {
        
    }
});
const hasKcal = () => ({});
const hasHR = () => ({});
const hasLocation = () => ({});
const hasStressLevel = () => ({});

module.exports = {
    hasSteps,
    hasTime,
    hasKcal,
    hasHR,
    hasLocation,
    hasStressLevel,
}