# classified

// TODO

## Usage

```jsx
import React from 'react';

import { classified } from "@vacasan/classified";

// Create a <Button> component that has a static className of `btn`
const Button = classified("button")([
  "btn",
  ({ variant = "primary" }) => `btn-${variant}`,
  ({ block }) => block && "btn-block"
]);

// Use them like any other React component
<Button>Ok</Button>
<Button variant="secondary">Cancel</Button>
<Button className="special" style={{ fontStyle: "italic" }}>Special</Button>
<Button block>Click me!</Button>

```
