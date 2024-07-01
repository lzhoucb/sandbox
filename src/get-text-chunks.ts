import { NotBlockElementError } from "./types";
import { getTextChunksFromTextNode, TextChunk } from "./text-chunk";
import { isBlock } from "./utility";

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
