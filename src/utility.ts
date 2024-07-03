export const TTS_HIGHLIGHT_CLASS_NAME = "tts-highlight";

export function printIndices(string: string) {
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