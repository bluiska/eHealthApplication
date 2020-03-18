const hasTime = self => ({});

const hasSteps = self => ({});

const hasKcal = self => ({});

const hasHR = self => ({});

const hasLocation = self => ({});

const hasStressLevel = self => ({});

const timeBehaviors = state => {
  const self = {
    ...state,
    measuringActivity: false,
    activities: [],
    activity: {},
    activityType: null,
    startTime: null,
    endTime: null,
    duration: null
  };
  return Object.assign({}, self, hasTime(self));
};

const stepsBehaviors = state => {
  const self = {
    ...state,
    stepsCounter: -1,
    distance: -1,
    stepsCounterInterval: null
  };
  return Object.assign({}, self, hasSteps(self));
};

const kcalBehaviors = state => {
  const self = {
    ...state,
    kcalBurnt: -1
  };
  return Object.assign({}, self, hasKcal(self));
};

const hrBehaviors = state => {
  const self = {
    ...state,
    hearRate: -1
  };
  return Object.assign({}, self, hasHR(self));
};

const locationBehaviors = state => {
  const self = {
    ...state,
    latitude: -1,
    longitude: -1
  };
  return Object.assign({}, self, hasLocation(self));
};

const stressBehaviors = state => {
  const self = {
    ...state,
    stressLevel: -1
  };
  return Object.assign({}, self, hasStressLevel(self));
};

export {
  timeBehaviors,
  stepsBehaviors,
  kcalBehaviors,
  hrBehaviors,
  locationBehaviors,
  stressBehaviors
};
