import React from "react";
import TestRenderer from "react-test-renderer";
import { classified } from "./classified";

test("it should inject className", () => {
  const Comp = classified("div", ["container"]);
  const wrapper = TestRenderer.create(<Comp />);
  expect(wrapper.root.findByType("div").props.className).toBe("container");
});

test("it should pass props to component", () => {
  const Comp = classified("div", []);
  const wrapper = TestRenderer.create(<Comp onClick={() => null} />);
  expect(wrapper.root.findByType("div").props.onClick).toBeDefined();
});
