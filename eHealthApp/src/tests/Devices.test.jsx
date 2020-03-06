// MyComponent.test.js
import React from 'react';
import { shallow } from 'enzyme';
import Devices from '../pages/Devices';

describe("Devices", () => {

  it("should render my component", () => {
    const wrapper = shallow(<Devices2 />);
  });
});