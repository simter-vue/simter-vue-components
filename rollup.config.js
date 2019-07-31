import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';

const banner = `/*!
* ${pkg.name} v${pkg.version}
* ${pkg.repository} 
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/`

const input = "src/components.js";
export default [
  // UMD build for Browser
  {
    external: ['vue'],
    input: input,
    output: {
      format: 'umd',
      name: pkg.name,
      globals: { 'vue': 'Vue' },
      file: pkg.browser,
      banner: banner
    },
    plugins: [
      builtins(),
      json(),
      resolve({ modulesOnly: true, only: [/^simter-vue-.*$/] }),
      commonjs(),
      vue(),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [["@babel/env", { "modules": false }]]
      })
    ]
  },

  // CommonJS build for Node.
  // And ES module build for bundlers.
  {
    external: ['vue', 'simter-vue-colgroup', 'simter-vue-thead'],
    input: input,
    output: [
      { file: pkg.main, format: 'cjs', banner: banner },
      { file: pkg.module, format: 'esm', banner: banner }
    ],
    plugins: [
      builtins(),
      json(),
      commonjs(),
      vue(),
      babel({ exclude: 'node_modules/**' })
    ]
  }
];