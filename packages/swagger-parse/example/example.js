import fs from 'fs';
import path from 'path';
import swaggerParse from '../esm/swagger-parse.esm.js';

await swaggerParse(
  fs.readFileSync(path.resolve('example/docs.yml'), { encoding: 'utf-8' })
);
