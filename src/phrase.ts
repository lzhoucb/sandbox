import { getTextChunksFromBlockElement, TextChunk } from "./text-chunk";
import { NotBlockElementError } from "./types";
import { isBlock } from "./utility";

interface Phrase {
  chunks: TextChunk[],
  text: string
}

// export function getPhrasesFromBlockElement(element: Element): Phrase[] {
//   if (!isBlock(element)) {
//     throw new NotBlockElementError(element);
//   }

//   const textChunks = getTextChunksFromBlockElement(element);

//   for (const textChunk of textChunks) {

//   }
// }