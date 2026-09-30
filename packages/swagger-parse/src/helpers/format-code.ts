import prettier from 'prettier';
import prettierAirlightConfig from 'prettier-config-airlight';

export default async function formatCode(code: string): Promise<string> {
  return prettier.format(code, prettierAirlightConfig);
}
