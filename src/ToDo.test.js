import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ToDo from "./ToDo";

Enzyme.configure({ adapter: new Adapter() });

it("renders properly", () => {
  const component = shallow(<ToDo />);
  expect(component.find("input").length).toBe(3);
  expect(component.find('.item').length).toBe(2);
});
