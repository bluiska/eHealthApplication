import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RenderPredictions from "./RenderPredictions";

import { createSerializer } from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

describe("<RenderPredictions />", () => {
  const activity = [
    {
      steps: -1,
      caloriesBurnt: -1.0,
      startTime: "2020-03-17T15:25:48.753Z",
      endTime: "2020-03-17T17:25:48.753Z",
      distance: 60.0,
      timestamp: "2020-03-17T17:25:48.752Z",
      patient: {
        doctor: {
          patients: [
            {
              name: "Aoife O'Connell",
              email: "aoife.na.heireann@outlook.ie",
              gender: "Female",
              dob: "1994-03-14T00:00:00Z",
              id: "TestPatient-3",
              model: {
                uri: "http://www.ehealth.ie/semantics",
                ignoreUnmappedProperties: false
              },
              uri: "http://www.ehealth.ie/semantics#TestPatient-3"
            },
            {
              name: "Elise Leclair",
              email: "elise.leclair13@outlook.fr",
              gender: "Female",
              dob: "1995-06-07T00:00:00Z",
              id: "TestPatient-4",
              model: {
                uri: "http://www.ehealth.ie/semantics",
                ignoreUnmappedProperties: false
              },
              uri: "http://www.ehealth.ie/semantics#TestPatient-4"
            },
            {
              name: "Roland Johannsen",
              email: "johannsenroland76@outlook.de",
              gender: "Male",
              dob: "1976-11-13T00:00:00Z",
              id: "TestPatient-5",
              model: {
                uri: "http://www.ehealth.ie/semantics",
                ignoreUnmappedProperties: false
              },
              uri: "http://www.ehealth.ie/semantics#TestPatient-5"
            }
          ],
          name: "Dr. Madeleine Girard",
          email: "madeleine.girard@ehs.com",
          gender: "Female",
          dob: "1995-11-01T00:00:00Z",
          id: "TestDoctor-1",
          model: {
            uri: "http://www.ehealth.ie/semantics",
            ignoreUnmappedProperties: false
          },
          uri: "http://www.ehealth.ie/semantics#TestDoctor-1"
        },
        name: "Genevieve Leblanc",
        email: "genevieve.la.toulousaine@outlook.fr",
        gender: "Female",
        dob: "1996-02-28T00:00:00Z",
        id: "TestPatient-7",
        model: {
          uri: "http://www.ehealth.ie/semantics",
          ignoreUnmappedProperties: false
        },
        uri: "http://www.ehealth.ie/semantics#TestPatient-7"
      },
      id: "Running_173111_17032020",
      model: {
        uri: "http://www.ehealth.ie/semantics",
        ignoreUnmappedProperties: false
      },
      uri: "http://www.ehealth.ie/semantics#Running_173111_17032020"
    },
    {
      diastolicPressure: 70.0,
      systolicPressure: 60.0,
      timestamp: "2020-03-17T13:28:36.558Z",
      patient: {
        doctor: {
          patients: [
            {
              name: "Aoife O'Connell",
              email: "aoife.na.heireann@outlook.ie",
              gender: "Female",
              dob: "1994-03-14T00:00:00Z",
              id: "TestPatient-3",
              model: {
                uri: "http://www.ehealth.ie/semantics",
                ignoreUnmappedProperties: false
              },
              uri: "http://www.ehealth.ie/semantics#TestPatient-3"
            },
            {
              name: "Elise Leclair",
              email: "elise.leclair13@outlook.fr",
              gender: "Female",
              dob: "1995-06-07T00:00:00Z",
              id: "TestPatient-4",
              model: {
                uri: "http://www.ehealth.ie/semantics",
                ignoreUnmappedProperties: false
              },
              uri: "http://www.ehealth.ie/semantics#TestPatient-4"
            },
            {
              name: "Roland Johannsen",
              email: "johannsenroland76@outlook.de",
              gender: "Male",
              dob: "1976-11-13T00:00:00Z",
              id: "TestPatient-5",
              model: {
                uri: "http://www.ehealth.ie/semantics",
                ignoreUnmappedProperties: false
              },
              uri: "http://www.ehealth.ie/semantics#TestPatient-5"
            }
          ],
          name: "Dr. Madeleine Girard",
          email: "madeleine.girard@ehs.com",
          gender: "Female",
          dob: "1995-11-01T00:00:00Z",
          id: "TestDoctor-1",
          model: {
            uri: "http://www.ehealth.ie/semantics",
            ignoreUnmappedProperties: false
          },
          uri: "http://www.ehealth.ie/semantics#TestDoctor-1"
        },
        name: "Genevieve Leblanc",
        email: "genevieve.la.toulousaine@outlook.fr",
        gender: "Female",
        dob: "1996-02-28T00:00:00Z",
        id: "TestPatient-7",
        model: {
          uri: "http://www.ehealth.ie/semantics",
          ignoreUnmappedProperties: false
        },
        uri: "http://www.ehealth.ie/semantics#TestPatient-7"
      },
      id: "BloodPressureReading_132837_17032020",
      model: {
        uri: "http://www.ehealth.ie/semantics",
        ignoreUnmappedProperties: false
      },
      uri:
        "http://www.ehealth.ie/semantics#BloodPressureReading_132837_17032020"
    }
  ];

  beforeEach(() => {
    jest.resetModules();
  });

  // unit tests
  it("it should save a snapshot", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("it should render the predicted data result", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".predicted-data-value")).toHaveLength(1);
  });

  it("it should render the average diatolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".avg-diatolic-pressure")).toHaveLength(1);
  });

  it("it should render the avgerage systolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".avg-systolic-pressure")).toHaveLength(1);
  });

  it("it should render the high diatolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".high-diatolic-pressure")).toHaveLength(1);
  });

  it("it should render the high systolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".high-systolic-pressure")).toHaveLength(1);
  });

  it("it should render the low diatolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".low-diatolic-pressure")).toHaveLength(1);
  });

  it("it should render the low systolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".low-systolic-pressure")).toHaveLength(1);
  });
  //

  it("it should render the average diatolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".avg-diatolic-pressure").text()).toEqual(
      "Average Diastolic Pressure: 70mmhg"
    );
  });

  it("it should render the avgerage systolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".avg-systolic-pressure").text()).toEqual(
      "Average Systolic Pressure: 60mmhg"
    );
  });

  it("it should render the high diatolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".high-diatolic-pressure").text()).toEqual(
      "Diastolic Pressure: 70mmgh"
    );
  });

  it("it should render the high systolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".high-systolic-pressure").text()).toEqual(
      "Systolic Pressure: 60mmgh"
    );
  });

  it("it should render the low diatolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".low-diatolic-pressure").text()).toEqual(
      "Diastolic Pressure: 70mmgh"
    );
  });

  it("it should render the low systolic pressure", () => {
    const wrapper = shallow(<RenderPredictions activities={activity} />);
    expect(wrapper.find(".low-systolic-pressure").text()).toEqual(
      "Systolic Pressure: 60mmgh"
    );
  });

  // acceptance tests
});
