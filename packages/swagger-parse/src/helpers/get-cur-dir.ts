import path from 'path';

export default function getCurrentDir(): string {
  try {
    throw new Error('Trigger');
  } catch (e: any) {
    const callDirectory = e.stack
      .split('\n')
      .find((line: string): boolean => line.includes(' file:///'));
    if (callDirectory) {
      return path.resolve(
        path.dirname(
          callDirectory.substr((callDirectory.indexOf('file') as number) + 7)
        )
      );
    }
  }
  return '';
}
