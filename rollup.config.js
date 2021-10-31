import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { dependencies } from './package.json';

const external = Object.keys(dependencies).concat([
  'events',
  'http',
  'zlib',
  'fs',
  'fs/promises'
]);

export default ['swagger-parse'].map((name) => ({
  input: `./packages/${name}/src/${name}.ts`,
  output: [
    {
      format: 'esm',
      file: `./packages/${name}/esm/${name}.esm.js`,
      strict: true,
      sourcemap: true,
      exports: 'auto'
    },
    {
      format: 'cjs',
      file: `./packages/${name}/cjs/${name}.cjs.js`,
      strict: true,
      sourcemap: true,
      exports: 'auto'
    }
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfigOverride: {
        include: [`packages/${name}/src`],
        compilerOptions: {
          rootDir: `packages/${name}/src`,
          declarationDir: `packages/${name}/typings`
        }
      },
      rollupCommonJSResolveHack: false,
      clean: true,
      useTsconfigDeclarationDir: true
    })
  ],
  external
}));
