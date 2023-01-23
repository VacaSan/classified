import type { ComponentProps, ElementType, HTMLProps } from "react";
import { createElement, forwardRef } from "react";
import isPropValid from "@emotion/is-prop-valid";

type Falsy = false | 0 | "" | null | undefined;

function classified(type) {
  return function createClassifiedComponent(names) {
    function ClassifiedComponent({ as = type, children, ...props }, ref) {
      let className = names
        .concat(props.className)
        .map(name => (isFunc(name) ? name(props) : name))
        .filter(Boolean)
        .join(" ");

      let elementProps = isString(as) ? getHtmlProps(props) : props;

      return createElement(
        as,
        Object.assign(elementProps, { className, ref }),
        children
      );
    }

    return forwardRef(ClassifiedComponent);
  };
}

function cx(names: Array<string | Falsy> = []) {
  return names.filter(Boolean).join(" ");
}

function isFunc(x: unknown): x is Function {
  return typeof x === "function";
}

function isString(x: unknown): x is string {
  return typeof x === "string";
}

function getHtmlProps(props: Record<string, any>) {
  return Object.keys(props).reduce((htmlProps, prop) => {
    if (isPropValid(prop)) {
      htmlProps[prop] = props[prop];
    }
    return htmlProps;
  }, {} as Partial<typeof props>);
}

export { classified, cx };
