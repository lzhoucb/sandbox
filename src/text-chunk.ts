import { NotBlockElementError } from "./types";
import { isBlock, printIndices, TTS_HIGHLIGHT_CLASS_NAME } from "./utility";

export class TextNodeChunk {
  node: Text;
  // parent: Element;
  start: number;
  end: number;

  constructor(node, start, end) {
    this.node = node;
    this.start = start;
    this.end = end;
  }
}

export interface TextChunk {
  chunk: Element | TextNodeChunk;
  text: string;
}

const textNodeBreakpoint = /[\.\?\!]\s+|(.|\n)$/; // Matches end-of-sentence punctuation or end of string

export function getTextChunksFromTextNode(node: Text): TextChunk[] {
  let text: string = node.textContent;
  let offset: number = 0;
  let end: number = text.search(textNodeBreakpoint);
  const textChunks: TextChunk[] = [];

  while (end !== -1) {
    const substring = text.substring(0, end + 1);
    textChunks.push({
      chunk: new TextNodeChunk(node, offset, offset + end),
      text: substring
    });

    offset += end + 1;
    text = text.substring(end + 1);
    end = text.search(textNodeBreakpoint);
  }

  return textChunks;
}

function pushChildren(node: Node, traversalStack: Node[]): void {
  const childNodes = node.childNodes;

  for (let i = childNodes.length - 1; i >= 0; --i) {
    const child = childNodes[i];

    if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.ELEMENT_NODE && !isBlock(child as Element)) {
      traversalStack.push(childNodes[i]);
    }
  }
}

export function getTextChunksFromBlockElement(element: Element): TextChunk[] {
  if (!isBlock(element)) {
    throw new NotBlockElementError(element);
  }

  const traversalStack: Node[] = [];
  pushChildren(element, traversalStack);

  const textChunks: TextChunk[] = [];

  while (traversalStack.length > 0) {
    const node = traversalStack.pop();

    if (node.nodeType === Node.TEXT_NODE) {
      textChunks.push(...(getTextChunksFromTextNode(node as Text)));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      if (element.matches(".mc-option>label")) {
        textChunks.push({ chunk: element, text: element.getAttribute("aria-label") });
      } else {
        const tagName = element.tagName.toUpperCase();

        if (tagName === "IMG" || tagName === "SVG") {
          textChunks.push({ chunk: element, text: (element as HTMLImageElement).alt });
        } else if (tagName === "MJX-CONTAINER") {
          if (element.getAttribute("aria-label")) {
            textChunks.push({ chunk: element, text: element.getAttribute("aria-label") });
          } else if (element.getAttribute("alttext")) {
            textChunks.push({ chunk: element, text: element.getAttribute("alttext") });
          }
        } else {
          pushChildren(element, traversalStack);
        }
      }
    }
  }

  return textChunks;
}

export function highlightTextChunk(textChunk: TextChunk) {
  console.log("highlighting");
  const chunk = textChunk.chunk;
  console.log(chunk);

  if (chunk instanceof Element) {
    chunk.classList.add(TTS_HIGHLIGHT_CLASS_NAME);
    return;
  }

  if (chunk instanceof TextNodeChunk) {
    console.log("bleh");
    const start = chunk.node;
    const middle = start.splitText(chunk.start);
    const end = middle.splitText(chunk.end - chunk.start + 1);
    const highlightSpan = document.createElement("span");
    highlightSpan.classList.add(TTS_HIGHLIGHT_CLASS_NAME);
    const parent = middle.parentNode;
    parent.insertBefore(highlightSpan, middle);
    highlightSpan.appendChild(parent.removeChild(middle));
  }
}