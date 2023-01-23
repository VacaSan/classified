import type { HTMLProps } from "react";
import { render, screen } from "@testing-library/react";
import { classified } from "./classified";

type Props = { variant?: "primary"; block?: boolean };

test("should create a component", () => {
  let Button = classified("button")([]);
  render(<Button>hello</Button>);
  expect(screen.getByRole("button", { name: /hello/i })).toBeInTheDocument();
});

test("should apply string classNames", () => {
  let Button = classified("button")(["btn"]);
  render(<Button>hello</Button>);
  expect(screen.getByRole("button", { name: /hello/i }).className).toBe("btn");
});

test("should apply dynamic classNames", () => {
  let Button = classified("button")([() => "btn"]);
  render(<Button>hello</Button>);
  expect(screen.getByRole("button", { name: /hello/i }).className).toBe("btn");
});

test("should pass props to dynamic className creator", () => {
  let Button = classified("button")([({ variant }: Props) => `btn-${variant}`]);
  render(<Button variant="primary">hello</Button>);
  expect(screen.getByRole("button", { name: /hello/i }).className).toBe(
    "btn-primary"
  );
});

test("should combine both static and dynamic classNames", () => {
  let Button = classified("button")([
    "btn",
    ({ variant }: Props) => `btn-${variant}`,
    ({ block }: Props) => block && "btn-block",
  ]);
  render(
    <Button variant="primary" block>
      hello
    </Button>
  );
  expect(screen.getByRole("button", { name: /hello/i }).className).toBe(
    "btn btn-primary btn-block"
  );
});

test("should accept any react component as the first argument", () => {
  function Link(props: HTMLProps<HTMLAnchorElement>) {
    return <a {...props} />;
  }

  let ClassifiedLink = classified(Link)(["link"]);
  render(<ClassifiedLink href="/read-more">Read more</ClassifiedLink>);
  expect(screen.getByRole("link", { name: /read more/i }).className).toBe(
    "link"
  );
});

test("component should accept any additional `className`", () => {
  let Button = classified("button")(["btn"]);
  render(<Button className="special">hello</Button>);
  expect(screen.getByRole("button", { name: /hello/i }).className).toBe(
    "btn special"
  );
});

test("component should accept `as` prop", () => {
  let Button = classified("button")(["btn"]);
  render(
    <Button as="a" href="/">
      hello
    </Button>
  );
  expect(screen.getByRole("link", { name: /hello/i }).className).toBe("btn");
});
