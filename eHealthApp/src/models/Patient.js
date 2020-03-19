const canAddDevice = state => ({
  addDevice: device => {
    state.devices.push(device);
  }
});

export const Patient = id => {
  const self = {
    id,
    devices: []
  };

  return Object.assign({}, self, canAddDevice(self));
};
