import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

const babelConfig = require('./babel.config');
const extensions = ['.js','.ts'];
const isBrowserVersion = process.argv.some(i=>i.indexOf('iife') > -1);

export default {
    input: 'src/index.ts',
    output: {
      name: 'treeHelper',
      file: `dist/index${isBrowserVersion ? '-browser' : ''}.js`,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        ...babelConfig,
        runtimeHelpers:true,
        exclude: 'node_modules/**',
        extensions,
      }),
      isBrowserVersion ? terser() : null
    ]
};