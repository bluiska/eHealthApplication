import { ConnectionStatus } from "./SensorEnums";

const hasTime = self => ({});

const hasSteps = self => ({});

const hasKcal = self => ({});

const hasHR = self => ({});

const hasLocation = self => ({});

const hasStressLevel = self => ({});

const hasConnectivity = self => ({
  pair(self) {
    if (!self.paired && !self.connected) {
      self.paired = true;
      self.connectionStatus = ConnectionStatus.PAIRED;
    }
  },

  connect(self) {
    if (!self.connected && self.paired) {
      self.connected = true;
      self.connectionStatus = ConnectionStatus.CONNECTED;
    }
  },

  unpair(self) {
    if (self.paired) {
      self.connected = false;
      self.paired = false;
      self.connectionStatus = ConnectionStatus.NOT_PAIRED;
    }
  },

  disconnect(self) {
    if (self.connected && self.paired) {
      self.connected = false;
      self.connectionStatus = ConnectionStatus.DISCONNECTED;
    }
  },

  syncData(self, newData) {
    if (self.connected && self.paired) {
      return self.activities;
    }
  }
});

const connectivityBehaviors = state => {
  const self = {
    ...state
  };
  return Object.assign({}, self, hasConnectivity(self));
};

const timeBehaviors = state => {
  const self = {
    ...state,
    specificTimeProperty: 12,
    specificTimeProperty2: 32
  };
  self.data = [
    ...state.data,
    self.specificTimeProperty,
    self.specificTimeProperty2
  ];
  return Object.assign({}, self, hasTime(self));
};

const stepsBehaviors = state => {
  const self = {
    ...state,
    specificStepsProperty: 10,
    specificStepsProperty2: 21
  };
  self.data = [
    ...state.data,
    self.specificStepsProperty,
    self.specificStepsProperty2
  ];
  return Object.assign({}, self, hasSteps(self));
};

const kcalBehaviors = state => {
  const self = {
    ...state,
    specificKcalProperty: 10
  };
  self.data = [...self.data, self.specificKcalProperty];
  return Object.assign({}, self, hasKcal(self));
};

const hrBehaviors = state => {
  const self = {
    ...state,
    specificHRProperty: 12
  };
  self.data = [...state.data, self.specificHRProperty];
  return Object.assign({}, self, hasHR(self));
};

const locationBehaviors = state => {
  const self = {
    ...state,
    specificLocationProperty: 10,
    specificLocationProperty2: -10
  };
  self.data = [
    ...state.data,
    self.specificLocationProperty,
    self.specificLocationProperty2
  ];
  return Object.assign({}, self, hasLocation(self));
};

const stressBehaviors = state => {
  const self = {
    ...state,
    specificStressProperty: 12
  };
  self.data = [...state.data, self.specificStressProperty];
  return Object.assign({}, self, hasStressLevel(self));
};

export {
  connectivityBehaviors,
  timeBehaviors,
  stepsBehaviors,
  kcalBehaviors,
  hrBehaviors,
  locationBehaviors,
  stressBehaviors
};
