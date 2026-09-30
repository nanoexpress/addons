import fs from 'node:fs';
import path from 'node:path';
import swaggerParse from '../esm/swagger-parse.esm.js';

await swaggerParse(
  fs.readFileSync(path.resolve('example/docs.yml'), { encoding: 'utf-8' })
);
