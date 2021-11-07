/* eslint-disable max-lines-per-function */
import { exec } from 'child_process';
import { readFile, rm, writeFile } from 'fs/promises';
import { resolve as pathResolve } from 'path';
import prettier from 'prettier';
import prettierAirlightConfig from 'prettier-config-airlight';
import camelCase from '../helpers/camel-case';
import getCurrentDir from '../helpers/get-cur-dir';
import removeComments from '../helpers/remove-comments';
import taskCatch from '../helpers/task-catch';
import { AjvContainer, AjvMain } from '../types';

export default async function ajvToTypeScriptDeclaration(
  ajvSchema: AjvContainer | null
): Promise<void> {
  if (!ajvSchema) {
    return;
  }

  let declarations = '';
  const dirname = getCurrentDir();
  const interfaceFile = pathResolve(dirname, 'dts-interface.d.ts');
  const validationFile = pathResolve(dirname, 'dts-validations.json');
  const validations: Record<string, AjvMain> = {};
  const fsOptions = { recursive: true, force: true };

  for (const path in ajvSchema) {
    const ajvPathSchema = ajvSchema[path];
    const pathName = path === '/' ? 'Main' : camelCase(path.substr(1));

    for (const method in ajvPathSchema) {
      const schemaMethod = `${camelCase(pathName)}${camelCase(method)}`;
      const ajvMethodSchema = ajvPathSchema[method];

      for (const type in ajvMethodSchema) {
        const ajvTypeSchema = ajvMethodSchema[type];
        const schemaName = `${schemaMethod}${camelCase(type)}`;
        const validationJsonFile = `I${schemaName}.json`;
        const validationDtsFile = `dts_I${schemaName}.d.ts`;

        if (!ajvTypeSchema) {
          continue;
        }

        const cleanup = (): Promise<void[]> =>
          Promise.all(
            [
              validationJsonFile,
              validationDtsFile,
              interfaceFile,
              validationFile
            ].map((file) => rm(file, fsOptions))
          );
        await cleanup();
        await writeFile(validationJsonFile, JSON.stringify(ajvTypeSchema));
        await new Promise((resolve, reject) =>
          exec(
            `yarn json2ts --enableConstEnums -i ${validationJsonFile} -o ${validationDtsFile}`,
            (error, stdout, stderr) => {
              if (!error && !stderr) {
                resolve(stdout);
              }
              reject(error || stderr);
            }
          )
        ).catch(
          taskCatch((): void => {
            cleanup();
          })
        );
        const interfaceContent = await readFile(validationDtsFile, {
          encoding: 'utf-8'
        });
        await cleanup();

        declarations += removeComments(interfaceContent);
      }
      validations[schemaMethod] = ajvMethodSchema;
    }
  }
  await Promise.all([
    writeFile(
      interfaceFile,
      prettier.format(declarations, {
        ...prettierAirlightConfig,
        parser: 'typescript'
      })
    ),
    writeFile(
      validationFile,
      prettier.format(JSON.stringify(validations), {
        ...prettierAirlightConfig,
        parser: 'json'
      })
    )
  ]);
}
