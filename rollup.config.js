import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    external: ['vue'],
    input: { 'components': 'src/components.js' },
    output: {
      format: 'umd',
      name: pkg.name,
      globals: { 'vue': 'Vue' },
      dir: 'dist',
      entryFileNames: 'simter/vue/[name].js',
      chunkFileNames: 'simter/vue/vue-[name]-[hash].js'
    },
    plugins: [
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
  }
];