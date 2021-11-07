export interface IAjvSchema {
    type: 'object' | 'array' | 'string';
    required: string[];
    properties: Record<string, IAjvSchema | IAjvSchema[]>;
    additionalProperties: boolean;
}
export declare type SwaggerParamType = 'headers' | 'queries' | 'cookies';
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
        content: Record<string, {
            schema: IAjvSchema;
        }>;
    };
}
export declare type SwaggerMain = Record<string, ISwaggerSchema>;
export declare type SwaggerContainer = Record<string, Record<string, SwaggerMain>>;
export declare type AjvMain = Record<string, IAjvSchema | null>;
export declare type AjvContainer = Record<string, Record<string, AjvMain>>;
export {};
//# sourceMappingURL=types.d.ts.map