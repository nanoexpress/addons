import {
  AjvContainer,
  IAjvSchema,
  SwaggerContainer,
  SwaggerParamType
} from '../types';
import { validatorPrepare } from '../utils/schema-prepare';

export default function swaggerToAjv(
  swaggerSchema: SwaggerContainer | null
): AjvContainer | null {
  if (!swaggerSchema) {
    return null;
  }

  const ajvSchemas = {} as AjvContainer;

  for (const field in swaggerSchema) {
    const swaggerSchemaValue = swaggerSchema[field];

    for (const path in swaggerSchemaValue) {
      const swaggerSchemaValueItem = swaggerSchemaValue[path];
      ajvSchemas[path] = {};

      for (const method in swaggerSchemaValueItem) {
        const swaggerSchemaItem = swaggerSchemaValueItem[method];
        ajvSchemas[path][method] = {};

        (['headers', 'queries', 'cookies'] as SwaggerParamType[]).forEach(
          (paramType) => {
            const schema = validatorPrepare(
              swaggerSchemaItem.parameters,
              paramType
            );

            if (schema) {
              ajvSchemas[path][method][paramType] = schema;
            }
          }
        );

        if (swaggerSchemaItem.requestBody) {
          const bodyContent: Array<{ key: string; schema: IAjvSchema }> = [];
          for (const [key, { schema }] of Object.entries(
            swaggerSchemaItem.requestBody.content
          )) {
            bodyContent.push({ key, schema });
          }
          if (bodyContent.length > 1) {
            throw new Error(
              'Swagger to Ajv transformer currently does not support `request.body` with more than one format, please use separate logic or pass Ajv yourself'
            );
          }
          if (bodyContent.length > 0) {
            ajvSchemas[path][method].body = bodyContent[0].schema;
          }
        }
      }
    }
  }
  return ajvSchemas;
}
