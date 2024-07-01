import { printIndices } from "./utility";

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

const endOfSentence = /[\.\?\!]\s+/;

export function getTextChunksFromTextNode(node: Text): TextChunk[] {
  let text: string = node.textContent;
  let offset: number = 0;
  let end: number = text.search(endOfSentence);
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
    end = text.search(endOfSentence);
  }

  const endChunk: TextNodeChunk = {
    node: node,
    start: offset,
    end: offset + text.length - 1
  }

  textChunks.push({
    chunk: endChunk,
    text: text
  });
  return textChunks;
}
// function getChunks(element: Element, visited: Set<Node>) {
//   const tcToHC: Map<SpeechChunk, TextChunk> = new Map(); // text chunk -> highlight chunk
//   const traversalStack: Node[] = [];
//   const childNodes = element.childNodes;

//   for (let i = childNodes.length - 1; i >= 0; --i) {
//     traversalStack.push(childNodes[i]);
//   }

//   while (traversalStack.length > 0) {
//     const node = traversalStack.pop();

//     if (node.nodeType === Node.TEXT_NODE) {
//       let text = node.textContent;
//       let endOfSentence = text.search(/\s+/);

//       while (endOfSentence !== -1) {
//       }
//     }
//   }
// }

