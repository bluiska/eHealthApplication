/**
 * An internal application's state (similar to Redux, or device's store)
 * Allows to save a state of the application so that it can be reused by multiple components
 */

/**
 * The state of the application with initial values
 */
var state = {
    pairedDevices: [], // The list of paired devices. Initially empty
}

/**
 * ApplicationState class has been created as a Singleton component. Only one copy of it exists in the application
 */
class ApplicationState {

    /**
     * Saves the array of paired devices into the state.
     * @param {Array} newPairedDevices - An array of paired devices that need to be stored
     */
    savePairedDevices = newPairedDevices => {
        /**
         * Saves passed array of devices into the state
         * Using `object destructuring` to ensure that state is copied into a new state beforehand
         */
        state = {
            pairedDevices: newPairedDevices
        }
        console.log("something changed: ", state);
    };
    
    /**
     * Return the list of paired devices
     * @returns {Array}
     */
    getPairedDevices = () => {
        return state.pairedDevices;
    };
};

/**
 * Using Singleton pattern here, ensuring that ApplicationState is created only once
 */
export default new ApplicationState();

