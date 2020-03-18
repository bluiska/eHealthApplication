// MyComponent.test.js
import React from "react";
import { shallow } from "enzyme";
import PatientDevices from "../pages/PatientDevices";

describe("Devices", () => {
  it("should render my component", () => {
    const wrapper = shallow(<PatientDevices />);
  });
});
