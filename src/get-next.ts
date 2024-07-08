import { isBlock } from "./utility";

function getNextBlockChild(cur: Element, visited: Set<Element>): Element {
  for (const child of cur.children) {
    if (!visited.has(child) && isBlock(child)) {
      return child;
    }
  }

  return null;
}

function getNextBlockSibling(cur: Element, visited: Set<Element>): Element {
  let sibling: Element = cur.nextElementSibling;

  while (sibling && (visited.has(sibling) || !isBlock(sibling))) {
    sibling = sibling.nextElementSibling;
  }

  return sibling;
}

function getNextBlockSiblingOfAncestor(cur: Element, visited: Set<Element>): Element {
  let ancestor: Element = cur.parentElement;

  while (ancestor) {
    const nextSiblingOfAncestor = getNextBlockSibling(ancestor, visited);

    if (nextSiblingOfAncestor) {
      return nextSiblingOfAncestor;
    }

    ancestor = ancestor.parentElement;
  }

  return null;
}

export function getNextBlockHelper(cur: Element, visited: Set<Element>): Element {
  let next: Element = getNextBlockChild(cur, visited);

  if (next) {
    return next;
  }

  next = getNextBlockSibling(cur, visited);

  if (next) {
    return next;
  }

  next = getNextBlockSiblingOfAncestor(cur, visited);
  return next;
}

// function isVisible(element: Element): boolean {
//   return window.getComputedStyle(element).visibility === "visible";
// }

// function isPlayable(track: Track): boolean {
//   return (
//     track.text && isVisible(track.associatedElement) && !isIgnoredBySpeech(track.associatedElement)
//   );
// }

// export function getNext(cur: Track, visited: Set<Node>): Track {
//   let next = getNextBlockHelper(cur, visited);

//   while (next && !isPlayable(next)) {
//     next = getNextBlockHelper(next, visited);
//   }

//   return next;
// }

function getNextBlockElement(cur: Element, visited: Set<Element>): Element {
  return getNextBlockHelper(cur, visited);
}