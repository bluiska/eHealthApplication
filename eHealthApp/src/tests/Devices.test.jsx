// Importing required dependencies
import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { render, act } from '@testing-library/react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Devices from '../pages/Devices';
import DeviceCard from '../components/DeviceCard';

Enzyme.configure({adapter: new Adapter()});

let container = null;
beforeEach(() => {
    // Setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // Cleanup on existing
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

// #0
describe("Devices component", () => {
    test("renders", () => {
        const wrapper = shallow(<Devices />);

        expect(wrapper.exists()).toBe(true);
    });
})

// #1 Testing if the Component renders without crashing
test("Component renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Devices />, div);
})

// #2 Testing if the page's "Header" title is "Devices" 
test("Page should have a header's title of Devices", async () => {
    const { findByText } = render(<Devices />);
    await findByText("Devices");
});

// #3 If there is no paired/connected devices found. Page should display an information
test("Page should display a message if there is no paired/connected devices found", async () => {
    const { findByText } = render(<Devices />);
    await findByText("No devices found");
});

// #4 If there are paired/connected devices found, they should be displayed
it("Renders paired/connected devices", async () => {
    const bluetoothDevice1 = {
        id: "sensor1",
        name: "fitbit",
        connected: "false",
        connectionStatus: "NOT_CONNECTED",
        onClick: () => {}
    };

    jest.spyOn(global, "fetch").mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(bluetoothDevice1)
        })
    );

    // Use the asynchronous version of 'act' to apply resolver promises
    await act(async () => {
        render(<DeviceCard 
                    title={bluetoothDevice1.name}
                    connected={bluetoothDevice1.connected} 
                    connectionStatus={bluetoothDevice1.connectionStatus}/>, container)
    });

    // const comp1 = container.querySelector('p');
    // const comp2 = container.querySelector("p");
    // const comp3 = container.querySelector("IonCard");
    // expect(comp1.textContent).toBe(bluetoothDevice1.title);
})
