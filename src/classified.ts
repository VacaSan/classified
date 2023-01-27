import type { ComponentProps, ElementType } from "react";
import { createElement, forwardRef } from "react";
import isPropValid from "@emotion/is-prop-valid";

type Falsy = false | 0 | "" | null | undefined;

type Generator<Props> = ((props: Props) => string | Falsy) | string | Falsy;

type ClassNames<Props> = Array<Generator<Props>>;

function classified<
  Type extends ElementType,
  AdditionalProps extends object = {}
>(type: Type) {
  type GeneratorProps = AdditionalProps & ComponentProps<Type>;

  return function createClassifiedComponent(names: ClassNames<GeneratorProps>) {
    type Props = GeneratorProps & {
      as?: Type;
      className?: string;
    };

    const ClassifiedComponent = forwardRef<Type, Props>((props: Props, ref) => {
      let className = names
        .concat(props.className)
        .map(name => (isFunc(name) ? name(props) : name))
        .filter(Boolean)
        .join(" ");

      let { as, ...elementProps } = isString(props.as)
        ? getHtmlProps(props)
        : props;

      return createElement(
        props.as || type,
        Object.assign({}, elementProps, { className, ref })
      );
    });

    return ClassifiedComponent;
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
