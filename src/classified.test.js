import React from "react";
import TestRenderer from "react-test-renderer";
import { findDOMNode } from "react-dom";
import { renderIntoDocument } from "react-dom/test-utils";
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

test("it should pass the ref to the component", () => {
  const Comp = classified("div", ["test-class"]);

  class Wrapper extends React.Component {
    constructor(props) {
      super(props);

      this.testRef = React.createRef();
    }

    render() {
      return (
        <div>
          <Comp ref={this.testRef} />
        </div>
      );
    }
  }

  const wrapper = renderIntoDocument(<Wrapper />);

  const component = findDOMNode(wrapper).querySelector(".test-class");

  expect(wrapper.testRef.current).toBe(component);
});

test("as prop changes the rendered element type", () => {
  const Comp = classified("button", ["btn"]);
  const wrapper = TestRenderer.create(<Comp as="a" />);
  expect(wrapper.toJSON()).toMatchInlineSnapshot(`
    <a
      className="btn"
    />
  `);
});
