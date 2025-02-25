import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { createSerializer } from "enzyme-to-json";
import { IonReactRouter } from "@ionic/react-router";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
import toJson from "enzyme-to-json";
import Devices from "./Devices";

describe("<Devices />", () => {
  it("it should render the a Devices component snapshot", () => {
    const wrapper = shallow(<Devices />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("it should render the a two connected devices", () => {
    const wrapper = shallow(<Devices />);
    expect(wrapper.find(".sensor1")).toHaveLength(1);
    expect(wrapper.find(".sensor2")).toHaveLength(1);
  });
});
