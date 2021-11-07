import prettier from 'prettier';
import prettierAirlightConfig from 'prettier-config-airlight';

export default function formatCode(code: string): string {
  return prettier.format(code, prettierAirlightConfig);
}
