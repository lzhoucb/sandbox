function stripZeroWidthSpaces(text: string): string {
  return text.replace(/\u200B/g, "");
}

function stripPunctuationFromStart(text: string): string {
  return text.replace(/^\s*[.,?]/, "");
}

function cleanText(text: string): string {
  return stripPunctuationFromStart(stripZeroWidthSpaces(text));
}

export function getText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;

    if (element.matches(".mc-option>label")) {
      return element.getAttribute("aria-label");
    }

    const tagName = element.tagName.toUpperCase();

    if (tagName === "IMG" || tagName === "SVG") {
      return (element as HTMLImageElement).alt;
    }

    if (tagName === "MJX-CONTAINER") {
      if (element.getAttribute("aria-label")) {
        return element.getAttribute("aria-label");
      }

      if (element.getAttribute("alttext")) {
        return element.getAttribute("alttext");
      }
    }
  }

  return null;
}
