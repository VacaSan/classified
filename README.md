# classified

// TODO

## Usage

```
npm install --save @vacasan/classified
```

```jsx
import React from 'react';
import { classified } from "@vacasan/classified";

const Button = classified("button")([
  "btn",
  ({ variant = "primary" }) => `btn-${variant}`,
  ({ block }) => block && "btn-block"
]);

<Button>Ok</Button> // <button className="btn btn-primary">
<Button variant="secondary">Cancel</Button> // <button className="btn btn-secondary" />
<Button className="special">Special</Button> // <button className="btn btn-primary special" />
<Button block>Click me!</Button> // <button className="btn btn-primary btn-block" />

```
