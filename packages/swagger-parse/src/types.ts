export interface IAjvSchema {
  type: 'object' | 'array' | 'string';
  required: string[];
  properties: Record<string, IAjvSchema | IAjvSchema[]>;
  additionalProperties: boolean;
}
export type SwaggerParamType = 'headers' | 'queries' | 'cookies';

export interface ISchema {
  required?: boolean;
}

export interface ISwaggerParameter {
  name: string;
  in: SwaggerParamType;
  schema: ISchema;
}

interface ISwaggerSchema {
  summary: string;
  description: string;
  consumes: string;
  produces: string;
  responses: Record<string, any>;
  parameters: ISwaggerParameter[];
  requestBody: {
    description?: string;
    content: Record<string, { schema: IAjvSchema }>;
  };
}

export type SwaggerMain = Record<string, ISwaggerSchema>;
export type SwaggerContainer = Record<string, Record<string, SwaggerMain>>;
export type AjvMain = Record<string, IAjvSchema | null>;
export type AjvContainer = Record<string, Record<string, AjvMain>>;
