import React from "react";
import isPropValid from "@emotion/is-prop-valid";

const makeIs = type => x => typeof x === type;
const isFunc = makeIs("function");
const isString = makeIs("string");

function getHtmlProps(props = {}) {
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

    // ! naive checking, but it's fine for now
    // if it's a string we assume that it's a valid DOM type element
    // else it's a valid component
    const elementProps = isString(T) ? getHtmlProps(props) : props;

    return <T {...elementProps} className={className} ref={ref} />;
  });
}

function cx(names = []) {
  return names.filter(Boolean).join(" ");
}

const curry = fn => (...args) =>
  args.length > 1 ? fn(...args) : (...rest) => fn(args[0], ...rest);

const classified = curry(createClassifiedComponent);

export { classified, cx };
