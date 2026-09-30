import jsYaml from 'js-yaml';
import type { SwaggerContainer } from '../types';

export default function swaggerSchemaParse(
  input: Record<string, any> | string
): SwaggerContainer | null {
  if (typeof input === 'string') {
    try {
      return JSON.parse(input) as SwaggerContainer;
    } catch (_e) {
      //
    }
    try {
      return jsYaml.load(input) as SwaggerContainer;
    } catch (_e) {
      throw new Error('The input is neither JSON or YAML');
    }
  } else if (typeof input === 'object') {
    return input;
  }

  return null;
}
