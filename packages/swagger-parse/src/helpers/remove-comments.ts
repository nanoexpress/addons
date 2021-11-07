export default function removeComments(fileContent: string): string {
  let commentOpened = false;
  let output = '';
  let pointer = 0;

  while (pointer++ < fileContent.length) {
    const prevChar = fileContent.charAt(pointer - 1);
    const char = fileContent.charAt(pointer);
    const nextChar = fileContent.charAt(pointer + 1);

    if (
      (char === '/' && nextChar === '*') ||
      (char === '*' && prevChar === '/')
    ) {
      commentOpened = true;
    } else if (char === '/' && prevChar === '*') {
      commentOpened = false;
    } else if (char === '\n') {
      if (
        prevChar === '/' ||
        prevChar === ' ' ||
        char === prevChar ||
        char === nextChar
      ) {
        // skip duplicate multilines
      } else {
        output += char;
      }
    } else if (!commentOpened) {
      output += char;
    }
  }
  return output;
}
