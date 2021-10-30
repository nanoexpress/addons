import ajvToTypeScriptDeclaration from './transformers/ajv-to-tsd';
import swaggerToAjv from './transformers/swagger-to-ajv';
import swaggerSchemaParse from './utils/schema-parse';

export default function (input: string | Record<string, any>): Promise<void> {
  const swaggerSchema = swaggerSchemaParse(input);
  const ajvSchema = swaggerToAjv(swaggerSchema);
  return ajvToTypeScriptDeclaration(ajvSchema);
}
