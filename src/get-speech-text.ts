import { ENDS_OF_SENTENCES, endsWithPunctuation, getMatchIndexes, isBlock, isElement, isTextNode, STARTS_OF_SENTENCES } from "./utility";
import { NotBlockElementError } from "./types";
import { getNodeText } from "./get-node-text";

export class TextNodeChunk {
  originalNode: Text;
  highlightedNode: Text = null;
  start: number;
  end: number;

  constructor(originalNode: Text, start: number, end: number) {
    this.originalNode = originalNode;
    this.start = start;
    this.end = end;
  }
}

export type PhraseChunk = TextNodeChunk | Element;

export class Phrase {
  text: string;
  chunks: PhraseChunk[];

  constructor() {
    this.text = "";
    this.chunks = [];
  }
}

interface SpeechText {
  text: string;
  indexToPhrase: Map<number, Phrase>;
}

export function getPhrasesFromBlockElement(element: Element): Phrase[] { // Then get speech text from phrases
  if (!isBlock(element)) {
    throw new NotBlockElementError(element);
  }

  const traversalStack: Node[] = [];

  function pushChildren(node: Node): void {
    const children = node.childNodes;

    for (let i = children.length - 1; i >= 0; --i) {
      const child = children[i];

      if (isTextNode(child) || isElement(child) && !isBlock(child as Element)) {
        traversalStack.push(child);
      }
    }
  }

  pushChildren(element);
  let phraseBuffer: Phrase = new Phrase();
  const phrases: Phrase[] = [];

  function flushPhraseBuffer() {
    if (phraseBuffer.text !== "" && phraseBuffer.chunks.length > 0) {
      phrases.push(phraseBuffer);
      phraseBuffer = new Phrase();
    }
  }

  while (traversalStack.length > 0) {
    const node = traversalStack.pop();
    const nodeText = getNodeText(node);

    if (isElement(node) && (node as Element).tagName.toUpperCase() === "BR") {
      flushPhraseBuffer();
      continue;
    }

    if (!nodeText) {
      pushChildren(node);
      continue;
    }

    if (isTextNode(node)) {
      const breakpoints = getMatchIndexes(nodeText, ENDS_OF_SENTENCES);
      let start = 0;

      for (const breakpoint of breakpoints) {
        phraseBuffer.text += nodeText.substring(start, breakpoint + 1);
        phraseBuffer.chunks.push(new TextNodeChunk(node as Text, start, breakpoint));
        flushPhraseBuffer();
        start = breakpoint + 1;
      }

      if (start < nodeText.length) {
        phraseBuffer.text += nodeText.substring(start);
        phraseBuffer.chunks.push(new TextNodeChunk(node as Text, start, nodeText.length - 1))
      }

      continue;
    }

    if (isElement(node)) {
      flushPhraseBuffer();
      phraseBuffer.text = nodeText;
      phraseBuffer.chunks = [node as Element];
      flushPhraseBuffer();
    }
  }

  flushPhraseBuffer();
  return phrases;
}

export function getSpeechTextFromPhrases(phrases: Phrase[]): SpeechText {
  let text: string = "";
  const indexToPhrase: Map<number, Phrase> = new Map<number, Phrase>();

  for (const phrase of phrases) {
    indexToPhrase.set(text.length, phrase);
    text += phrase.text + (endsWithPunctuation(phrase.text) ? " " : ". ");
  }

  return { text, indexToPhrase };
}