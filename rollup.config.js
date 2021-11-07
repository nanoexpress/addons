import typescript from 'rollup-plugin-typescript2';
import { dependencies } from './package.json';

const modules = ['swagger-parse'];
const external = Object.keys(dependencies).concat([
  'events',
  'http',
  'zlib',
  'fs',
  'fs/promises',
  'path',
  'child_process'
]);
modules.forEach((moduleName) => {
  const {
    dependencies: moduleDepedencies
  } = require(`./packages/${moduleName}/package.json`);

  external.push(...Object.keys(moduleDepedencies));
});

export default modules.map((name) => ({
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
    typescript({
      tsconfigOverride: {
        include: [`packages/${name}/src`],
        compilerOptions: {
          rootDir: `packages/${name}/src`,
          declarationDir: `packages/${name}/typings`
        }
      },
      rollupCommonJSResolveHack: true,
      clean: true,
      useTsconfigDeclarationDir: true
    })
  ],
  external
}));
