export const TTS_HIGHLIGHT_CLASS_NAME = "tts-highlight";
export const STARTS_OF_SENTENCES = /^.|(?<=[.!?]\s+)./g;
export const ENDS_OF_SENTENCES = /(?<=[.!?]\s*)\s/g;

export function printIndices(string: string): void {
  let out = "";

  for (let i = 0; i < string.length; ++i) {
    out += string.charAt(i) + '\t';
  }

  console.log(out);
  out = "";

  for (let i = 0; i < string.length; ++i) {
    out += i + '\t';
  }

  console.log(out);
}

export function isBlock(element: Element): boolean {
  return window.getComputedStyle(element).display === "block";
}

export function isTextNode(node: Node): boolean {
  return node.nodeType === Node.TEXT_NODE;
}

export function isElement(node: Node): boolean {
  return node.nodeType === Node.ELEMENT_NODE;
}

export function getMatchIndexes(string: string, regex: RegExp): number[] {
  const indexes: number[] = [];

  for (let match = regex.exec(string); match !== null; match = regex.exec(string)) {
    indexes.push(match.index);
  }

  return indexes;
}