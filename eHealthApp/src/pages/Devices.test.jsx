import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import React from "react";
import { shallow } from "enzyme";
import Devices from "./Devices";

describe("Devices Component", () => {
  it("should render correctly in mode", () => {
    const component = shallow(<Devices />);

    expect(component).toMatchSnapshot();
  });
});
