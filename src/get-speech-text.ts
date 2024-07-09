import { END_OF_SENTENCE, getMatchIndexes, isBlock, isElement, isTextNode } from "./utility";
import { NotBlockElementError } from "./types";
import { getNodeText } from "./get-node-text";

function pushChildren(node: Node, traversalStack: Node[]): void {
  const children = node.childNodes;

  for (let i = children.length - 1; i >= 0; --i) {
    const child = children[i];

    if (isTextNode(child) || isElement(child) && !isBlock(child as Element)) {
      traversalStack.push(child);
    }
  }
}

class TextNodeChunk {
  node: Text;
  start: number;
  end: number;

  constructor(node: Text, start: number, end: number) {
    this.node = node;
    this.start = start;
    this.end = end;
  }
}

type PhraseChunk = TextNodeChunk | Element;
type Phrase = PhraseChunk[];

export function getPhrasesFromBlockElement(element: Element): Phrase[] { // Then get speech text from phrases
  if (!isBlock(element)) {
    throw new NotBlockElementError(element);
  }

  const traversalStack: Node[] = [];
  pushChildren(element, traversalStack);
  let phraseBuffer: Phrase = [];
  const phrases: Phrase[] = [];

  function flushPhraseBuffer() {
    if (phraseBuffer.length > 0) {
      phrases.push(phraseBuffer);
      phraseBuffer = [];
    }
  }

  while (traversalStack.length > 0) {
    const node = traversalStack.pop();
    const nodeText = getNodeText(node);

    if (!nodeText) {
      pushChildren(node, traversalStack);
      continue;
    }

    if (isTextNode(node)) {
      const breakpoints = getMatchIndexes(nodeText, END_OF_SENTENCE);
      let start = 0;

      for (const breakpoint of breakpoints) {
        phraseBuffer.push(new TextNodeChunk(node as Text, start, breakpoint));
        flushPhraseBuffer();
        start = breakpoint + 1;
      }

      if (start < nodeText.length) {
        phraseBuffer.push(new TextNodeChunk(node as Text, start, nodeText.length - 1))
      }

      continue;
    }

    if (isElement(node)) {
      flushPhraseBuffer();
      phrases.push([node as Element]);
      flushPhraseBuffer();
    }
  }

  flushPhraseBuffer();
  return phrases;
}

export function getSpeechTextFromPhrases(phrases: Phrase[]) {
  let speechText: string = "";
  const indexToPhrase: Map<number, Phrase> = new Map<number, Phrase>();

  for (const phrase of phrases) {
    indexToPhrase.set(speechText.length, phrase);

    for (const phraseChunk of phrase) {
      // This will recalculate speech text from elements; instead store the calculated speech text?
    }
  }
}