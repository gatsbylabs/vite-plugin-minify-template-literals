import { defineConfig } from "vite";
import { plugin } from "./dist/index.mjs";

export default defineConfig({
  plugins: [plugin()],
  build: {
    outDir: "testbuild",
    minify: false,
  },
});
