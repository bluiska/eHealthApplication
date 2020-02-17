import IBluetoothEnabledDevice from '../interfaces/IBluetoothEnabledDevice';

class Fitbit extends IBluetoothEnabledDevice {
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
    }


};

export default Fitbit;