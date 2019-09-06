import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ToDo from "./ToDo";

Enzyme.configure({ adapter: new Adapter() });

it("renders properly", () => {
  const component = shallow(<ToDo />);
  expect(component.find("input").length).toBe(3);
  expect(component.find(".item").length).toBe(2);
});

it("init correct state", () => {
  const component = shallow(<ToDo />);
  expect(component.state().todos.length).toBe(2);
  expect(component.state().openForm).toBe(false);
  expect(component.state().searchText).toBe("");
  expect(component.state().title).toBe("");
});

it("open form", () => {
  const component = shallow(<ToDo />);
  const { add } = component.instance();
  add();
  expect(component.state().openForm).toBe(true);
});

it("change text", () => {
  const component = shallow(<ToDo />);
  const { onChange } = component.instance();
  onChange({ target: { value: "title" } });
  expect(component.state().title).toBe("title");
});

it("change search", () => {
  const component = shallow(<ToDo />);
  const { onSearch } = component.instance();
  onSearch({ target: { value: "text" } });
  expect(component.state().searchText).toBe("text");
});
