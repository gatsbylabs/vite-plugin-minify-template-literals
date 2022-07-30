# Vite Plugin Minify Template Literals

Minify tagged template literal strings for styled components and graphql by removing white space.
Template literals tagged with `gql`, `css`, and `styled.*` will be minified.
This can shave some bytes off your total bundle size without changing application code.

```js
import gql from "graphql-tag";

const query = gql`
  {
    user(id: 5) {
      firstName
      lastName
    }
  }
`;

// becomes gql`{user(id:5)}{firstName lastName}}`
```

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import templateLiteralPlugin from "@gatsbylabs/vite-plugin-minify-template-literals";

defineConfig({
  plugins: [templateLiteralPlugin()],
});
```

### Options

```ts
export interface Options {
  css?: boolean; // default is true, set to false to disable css/styled.* minification
  gql?: boolean; // default is true, set to false to disable gql minification
}
```

---

Created and maintained by [Enoch Chau](https://enochchau.com) and the engineers at [Gatsby Labs](https://gatsby.events).
