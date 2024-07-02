import { getTextChunksFromBlockElement, TextChunk } from "./text-chunk";
import { NotBlockElementError } from "./types";
import { isBlock } from "./utility";

interface Phrase {
  chunks: TextChunk[],
  text: string
}

const phraseBreakpoint = /[\.\?\!]$/; // Matches end-of-string punctuation

export function getPhrasesFromBlockElement(element: Element): Phrase[] {
  if (!isBlock(element)) {
    throw new NotBlockElementError(element);
  }

  const textChunks = getTextChunksFromBlockElement(element);
  let phrase: Phrase = null;
  const phrases: Phrase[] = [];

  for (let i = 0; i < textChunks.length; ++i) {
    const textChunk = textChunks[i];

    if (!phrase) {
      phrase = { chunks: [], text: "" };
    }

    phrase.chunks.push(textChunk);
    phrase.text += textChunk.text;

    if (phraseBreakpoint.test(textChunk.text)) {
      phrases.push(phrase);
      phrase = null;
    }
  }

  if (phrase) { // If there's any phrase remaining that doesn't end with punctuation, push that too
    phrases.push(phrase);
  }

  return phrases;
}