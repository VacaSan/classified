import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const input = "./src/classified.js";

const config = {
  input,
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  plugins: [
    external(),
    babel({ exclude: "node_modules/**/*" }),
    resolve(),
    commonjs(),
  ],
};

export default config;
