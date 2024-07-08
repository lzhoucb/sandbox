import { isBlock } from "./utility";
import { NotBlockElementError } from "./types";

const END_OF_SENTENCE = /[.!?]\s+|.$/

function pushChildren(node: Node, traversalStack: Node[]): void {
  const childNodes = node.childNodes;

  for (let i = childNodes.length - 1; i >= 0; --i) {
    const child = childNodes[i];

    if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.ELEMENT_NODE && !isBlock(child as Element)) {
      traversalStack.push(childNodes[i]);
    }
  }
}

export function getEndsOfSentences(string: string): number[] {
  let searchString: string = string;
  let end: number = searchString.search(END_OF_SENTENCE);
  let offset = 0;
  const ends: number[] = [];

  while (end !== -1) {
    ends.push(offset + end);
    offset += end + 1;
    searchString = searchString.substring(end + 1);
    end = searchString.search(END_OF_SENTENCE);
  }

  return ends;
}


function getSpeechTextFromBlockElement(element: Element) {
  if (!isBlock(element)) {
    return new NotBlockElementError(element);
  }

  const traversalStack: Node[] = [];
  pushChildren(element, traversalStack);
  let speechText = "";

  while (traversalStack.length > 0) {
    const node = traversalStack.pop();

    if (node instanceof Text) {
      const startsOfWords = getEndsOfSentences(node.textContent);

      for (const startOfWord of startsOfWords) {

      }
    }
    // if (node.nodeType === Node.TEXT_NODE) {
    //   textChunks.push(...(getTextChunksFromTextNode(node as Text)));
    // } else if (node.nodeType === Node.ELEMENT_NODE) {
    //   const element = node as Element;

    //   if (element.matches(".mc-option>label")) {
    //     textChunks.push({ chunk: element, text: element.getAttribute("aria-label") });
    //   } else {
    //     const tagName = element.tagName.toUpperCase();

    //     if (tagName === "IMG" || tagName === "SVG") {
    //       textChunks.push({ chunk: element, text: (element as HTMLImageElement).alt });
    //     } else if (tagName === "MJX-CONTAINER") {
    //       if (element.getAttribute("aria-label")) {
    //         textChunks.push({ chunk: element, text: element.getAttribute("aria-label") });
    //       } else if (element.getAttribute("alttext")) {
    //         textChunks.push({ chunk: element, text: element.getAttribute("alttext") });
    //       }
    //     } else {
    //       pushChildren(element, traversalStack);
    //     }
    //   }
    // }
  }
}