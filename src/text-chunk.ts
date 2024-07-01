import { NotBlockElementError } from "./types";
import { isBlock, printIndices } from "./utility";

export interface TextNodeChunk {
  node: Text;
  // parent: Element;
  start: number;
  end: number;
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
    const textNodeChunk: TextNodeChunk = {
      node: node,
      // parent: target.parentElement,
      start: offset,
      end: offset + end
    };
    textChunks.push({
      chunk: textNodeChunk,
      text: substring
    });

    offset += end + 1;
    text = text.substring(end + 1);
    end = text.search(textNodeBreakpoint);
  }

  // const endChunk: TextNodeChunk = {
  //   node: node,
  //   start: offset,
  //   end: offset + text.length - 1
  // }

  // textChunks.push({
  //   chunk: endChunk,
  //   text: text
  // });
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