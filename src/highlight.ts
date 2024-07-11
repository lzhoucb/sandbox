import { TextNodeChunk, PhraseChunk, Phrase } from "./get-speech-text";
import { NotHighlightSpanError } from "./types";
import { isTextNode } from "./utility";

export function highlightTextNodeChunk(chunk: TextNodeChunk): void {
  chunk.highlightedNode = chunk.originalNode;

  if (chunk.start > 0) {
    chunk.highlightedNode = chunk.originalNode.splitText(chunk.start);
  }

  if (chunk.end - chunk.start + 1 < chunk.highlightedNode.textContent.length) {
    chunk.highlightedNode.splitText(chunk.end - chunk.start + 1);
  }

  const highlightSpan = document.createElement("span");
  highlightSpan.classList.add("tts-highlight");
  let parent: Node = chunk.originalNode.parentNode;
  parent.replaceChild(highlightSpan, chunk.originalNode);
  highlightSpan.appendChild(chunk.originalNode);
}

export function highlightPhraseChunk(chunk: PhraseChunk): void {
  if (chunk instanceof TextNodeChunk) {
    highlightTextNodeChunk(chunk);
  } else if (chunk instanceof Element) {
    chunk.classList.add("tts-highlight");
  }
}

export function highlightPhrase(phrase: Phrase) {
  for (const chunk of phrase.chunks) {
    highlightPhraseChunk(chunk);
  }
}

export function unhighlightTextNodeChunk(chunk: TextNodeChunk): void {
  const highlightSpan = chunk.highlightedNode.parentElement;

  if (highlightSpan.tagName.toUpperCase() !== "SPAN" || !highlightSpan.classList.contains("tts-highlight")) {
    throw new NotHighlightSpanError(highlightSpan);
  }

  const parent = highlightSpan.parentNode;
  parent.insertBefore(chunk.highlightedNode, highlightSpan);
  parent.removeChild(highlightSpan);

  // if (chunk.originalNode.previousSibling && isTextNode(chunk.originalNode.previousSibling)) {
  //   parent.removeChild(chunk.originalNode.previousSibling);
  // }

  // if (chunk.originalNode.nextSibling && isTextNode(chunk.originalNode.nextSibling)) {
  //   parent.removeChild(chunk.originalNode.nextSibling);
  // }

  while (chunk.originalNode.nextSibling && isTextNode(chunk.originalNode.nextSibling)) {
    chunk.originalNode.textContent += chunk.originalNode.nextSibling.textContent;
    parent.removeChild(chunk.originalNode.nextSibling);
  }

  // chunk.originalNode.textContent = chunk.originalText;
  // chunk.originalText = null;
}

export function unhighlightPhraseChunk(chunk: PhraseChunk): void {
  if (chunk instanceof TextNodeChunk) {
    unhighlightTextNodeChunk(chunk);
  } else if (chunk instanceof Element) {
    chunk.classList.remove("tts-highlight");
  }
}

export function unhighlightPhrase(phrase: Phrase): void {
  for (const chunk of phrase.chunks) {
    unhighlightPhraseChunk(chunk);
  }
}