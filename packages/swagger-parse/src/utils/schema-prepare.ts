import {
  IAjvSchema,
  ISchema,
  ISwaggerParameter,
  SwaggerParamType
} from '../types';

export const flatObjects = (
  previousValue: Record<string, ISchema>,
  currentValue: Record<string, ISchema>
): Record<string, ISchema> =>
  previousValue ? Object.assign(previousValue, currentValue) : currentValue;

const mapParams = ({
  name,
  schema: { required, ...schema }
}: ISwaggerParameter): Record<string, any> => ({
  [name]: schema
});

export function schemaPrepare(
  content: Record<SwaggerParamType, Record<string, ISchema>>,
  handler: (schema: ISchema) => ISchema
): Record<string, any> | IAjvSchema {
  return Object.entries(content)
    .map(([type, { schema }]) => ({
      [type]: handler(schema)
    }))
    .reduce(flatObjects);
}

export function validatorPrepare(
  parameters: ISwaggerParameter[],
  type: SwaggerParamType
): IAjvSchema | null {
  if (!parameters) {
    return null;
  }
  const matches: ISwaggerParameter[] = parameters.filter(
    (param) => param.in === type
  );
  if (matches.length > 0) {
    const values = matches.map(mapParams).reduce(flatObjects);
    const requiredFields: string[] = matches
      .filter((param) => param?.schema?.required)
      .map((param) => param.name);

    return {
      type: 'object',
      required: requiredFields,
      properties: values,
      additionalProperties: false
    };
  }

  return null;
}
