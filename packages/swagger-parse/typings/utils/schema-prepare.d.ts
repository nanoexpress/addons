import { IAjvSchema, ISchema, ISwaggerParameter, SwaggerParamType } from '../types';
export declare const flatObjects: (previousValue: Record<string, ISchema>, currentValue: Record<string, ISchema>) => Record<string, ISchema>;
export declare function schemaPrepare(content: Record<SwaggerParamType, Record<string, ISchema>>, handler: (schema: ISchema) => ISchema): Record<string, any> | IAjvSchema;
export declare function validatorPrepare(parameters: ISwaggerParameter[], type: SwaggerParamType): IAjvSchema | null;
//# sourceMappingURL=schema-prepare.d.ts.map