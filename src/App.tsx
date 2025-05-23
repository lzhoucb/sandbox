import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [semanticTNCHighlights, setSemanticTNCHighlights] = useState<TextNodeChunkHighlight[]>([]);
  useMutatingHighlights(semanticTNCHighlights);

  useEffect(() => {
    const text = document.getElementById("test").childNodes[0];
    setSemanticTNCHighlights([
      new TextNodeChunkHighlight(new TextNodeChunk(text as Text, 4, 16), "tts-highlight"),
      new TextNodeChunkHighlight(new TextNodeChunk(text as Text, 4, 8), "tts-highlight-2")
    ])
  }, [])

  return <p id="test">
    The quick brown fox jumps over the lazy dog.
  </p>
}

class TextNodeChunk {
  node: Text;
  start: number;
  end: number;

  constructor(node: Text, start: number, end: number) {
    this.node = node;
    this.start = start;
    this.end = end;
  }
}

class TextNodeChunkHighlight {
  chunk: TextNodeChunk;
  className: string;

  constructor(chunk: TextNodeChunk, className: string) {
    this.chunk = chunk;
    this.className = className;
  }
}

const useMutatingHighlights = (tncHighlights: TextNodeChunkHighlight[]) => {
  const originalTNToHighlightNodesRef = useRef(new Map<Text, ChildNode[]>());

  useEffect(() => {
    restoreOriginalTextNodes();
    const originalTNToClassNames = getOriginalTNToClassNames(tncHighlights);

    for (const [node, classNames] of originalTNToClassNames) {
      originalTNToHighlightNodesRef.current.set(node, getHighlightNodes(node, classNames));
    }

    for (const [originalNode, highlightNodes] of originalTNToHighlightNodesRef.current) {
      for (const highlightNode of highlightNodes) originalNode.before(highlightNode);
      originalNode.remove();
    }
  }, [tncHighlights])

  function restoreOriginalTextNodes() {
    for (const [originalNode, highlightNodes] of originalTNToHighlightNodesRef.current) {
      if (highlightNodes.length === 0) continue;
      highlightNodes[0].before(originalNode);
      for (const highlightNode of highlightNodes) highlightNode.remove();
    }

    originalTNToHighlightNodesRef.current.clear();
  }

  function getOriginalTNToClassNames(semanticTNCHighlights: TextNodeChunkHighlight[]) {
    const originalTNToClassNames = new Map<Text, string[]>();

    for (const highlight of semanticTNCHighlights) {
      const chunk = highlight.chunk;
      const node = chunk.node;

      if (!originalTNToClassNames.has(node)) {
        originalTNToClassNames.set(node, new Array(node.textContent.length).fill(null));
      }

      const classNameIndexes = originalTNToClassNames.get(node);
      const className = highlight.className;

      for (let i = chunk.start; i < chunk.end; ++i) {
        classNameIndexes[i] = className;
      }
    }

    return originalTNToClassNames;
  }

  function getHighlightNodes(original: Text, classNames: string[]) {
    let left = 0, right = 0;
    let curClassName = classNames[right];
    const highlightNodes: ChildNode[] = [];
    const originalText = original.textContent;

    while (left < classNames.length) {
      ++right;

      if (right === classNames.length || classNames[right] !== curClassName) {
        if (curClassName === null) {
          highlightNodes.push(new Text(originalText.substring(left, right)));
        } else {
          const span = document.createElement("span");
          span.classList.add(curClassName);
          span.append(new Text(originalText.substring(left, right)));
          highlightNodes.push(span);
        }

        if (right < classNames.length) curClassName = classNames[right];
        left = right;
      }
    }

    return highlightNodes;
  }
}


export default App;
