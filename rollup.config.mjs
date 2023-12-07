import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
//import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import banner2 from 'rollup-plugin-banner2'
import dts from 'rollup-plugin-dts'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodePolyfills({
        include: ['stream', 'events', 'buffer', 'util', 'tty', 'os'],
      }),
      typescript({ tsconfig: './rollup.tsconfig.cjs.json' }),
      json(),
      PeerDepsExternalPlugin(),
      resolve({ browser: true }),
      commonjs(),
      injectProcessEnv({
        NODE_ENV: process.NODE_ENV,
      }),
      //terser(),
      banner2(
        () => `'use client'
  `
      ),
    ],
    onwarn(warning, warn) {
      if (
        warning.code !== 'MODULE_LEVEL_DIRECTIVE' ||
        warning.code !== 'EVAL'
      ) {
        warn(warning)
      }
    },
  },
  {
    input: 'dist/types/src/index.d.ts',
    output: [{ file: './dist/index.d.ts', format: 'cjs' }],
    plugins: [dts()],
  },
]
