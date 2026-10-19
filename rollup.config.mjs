import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from "./package.json" with { type: "json" };

export default [
  {
    input: "src/index.ts",
    // Both outputs share `dir: "dist"` so that the single typescript plugin
    // instance has one declarationDir inside both of them. The published file
    // paths are unchanged.
    output: [
      {
        dir: "dist",
        entryFileNames: packageJson.main.replace(/^dist\//, ""),
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "dist",
        entryFileNames: packageJson.module.replace(/^dist\//, ""),
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
			peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
			postcss(),
			terser(),
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.s?css$/],
  },
];
