import { getPhrasesFromBlockElement, Phrase } from "./phrase";
import { isBlock } from "./utility";

export type Playlist = Phrase[];

export function getPlaylist(root: Element): Playlist {
  const traversalStack: Element[] = [];
  traversalStack.push(root);
  const playlist: Playlist = [];

  while (traversalStack.length > 0) {
    const element = traversalStack.pop();
    const phrases = getPhrasesFromBlockElement(element);
    playlist.push(...phrases);
    const children = element.children;

    for (let i = children.length - 1; i >= 0; --i) {
      const child = children[i];

      if (isBlock(child)) {
        traversalStack.push(child);
      }
    }
  }

  return playlist;
}