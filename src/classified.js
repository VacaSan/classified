import React from "react";
import curryN from "ramda/src/curryN";
import isPropValid from "@emotion/is-prop-valid";

const isFunc = x => typeof x === "function";

function validateProps(props = {}) {
  const validProps = {};
  for (const prop in props) {
    if (props.hasOwnProperty(prop) && isPropValid(prop)) {
      validProps[prop] = props[prop];
    }
  }
  return validProps;
}

function createClassifiedComponent(tag, names = []) {
  // ? className = staticNames + dynamicNames(props) + props.className
  return React.forwardRef(function Classified({ as: T = tag, ...props }, ref) {
    // ? can we optimize this
    const className = Array.prototype
      .concat(names, props.className)
      .map(name => (isFunc(name) ? name(props) : name))
      .filter(Boolean)
      .join(" ");

    // ! only validate for html elements
    const elementProps = validateProps(props);

    return <T {...elementProps} className={className} ref={ref} />;
  });
}

function cx(names = []) {
  return names.filter(Boolean).join(" ");
}

const classified = curryN(2, createClassifiedComponent);

export { classified, cx };
