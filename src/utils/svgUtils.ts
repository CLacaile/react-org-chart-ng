export function wrapText(textValue: string, maxLength: number): string[] {
    const words = textValue.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + ' ' + word;
      // Measuring the length could be more complicated depending on the font and size
      if (testLine.length < maxLength) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
}