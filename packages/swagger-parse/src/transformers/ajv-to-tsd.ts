import { exec } from 'child_process';
import { unlink, writeFile } from 'fs/promises';
import { resolve as pathResolve } from 'path';
import camelCase from '../helpers/camel-case';
import { AjvContainer } from '../types';

export default async function ajvToTypeScriptDeclaration(
  ajvSchema: AjvContainer | null
): Promise<void> {
  if (!ajvSchema) {
    return;
  }

  for (const path in ajvSchema) {
    const ajvPathSchema = ajvSchema[path];
    const pathName = path === '/' ? 'Main' : camelCase(path.substr(1));

    for (const method in ajvPathSchema) {
      const ajvMethodSchema = ajvPathSchema[method];

      for (const type in ajvMethodSchema) {
        const ajvTypeSchema = ajvMethodSchema[type];

        if (!ajvTypeSchema) {
          continue;
        }

        const interfaceName = `I${pathName}${camelCase(method)}${camelCase(
          type
        )}`;
        const interfaceFileName = interfaceName
          .replace(
            /[A-Z]/g,
            (val, offset) => `${offset > 0 ? '-' : ''}${val.toLowerCase()}`
          )
          .substr(2);
        const validationJsonFile = pathResolve(
          `validations/${interfaceFileName}.json`
        );
        const validationDtsFile = pathResolve(
          `validations/${interfaceName}.d.ts`
        );

        await unlink(validationJsonFile);
        await unlink(validationDtsFile);

        await writeFile(
          validationJsonFile,
          JSON.stringify(ajvTypeSchema, null, 2)
        );
        await new Promise((resolve, reject) =>
          exec(
            `yarn json2ts -i ${validationJsonFile} -o ${validationDtsFile}`,
            (error, stdout, stderr) => {
              if (!error && !stderr) {
                resolve(stdout);
              }
              reject(error || stderr);
            }
          )
        );
      }
    }
  }
}
