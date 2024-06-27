import React, { useEffect } from "react";

const synth = window.speechSynthesis;

interface TextNodeChunk {
  node: Text;
  parent: Element;
  start: number;
  end: number;
}

type HighlightChunk = Element | TextNodeChunk;
type TextChunk = String;

function getChunks(element: Element, visited: Set<Node>) {
  const tcToHC: Map<TextChunk, HighlightChunk> = new Map(); // text chunk -> highlight chunk
  const traversalStack: Node[] = [];
  const childNodes = element.childNodes;

  for (let i = childNodes.length - 1; i >= 0; --i) {
    traversalStack.push(childNodes[i]);
  }

  while (traversalStack.length > 0) {
    const node = traversalStack.pop();

    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      let endOfSentence = text.search(/\s+/);

      while (endOfSentence !== -1) {

      }
    }
  }
}

function App() {
  useEffect(() => {
    console.clear();
    const target = document.getElementById("test");
    // const utterance = new SpeechSynthesisUtterance(target?.textContent!);
    // utterance.addEventListener("boundary", event => {
    //   console.log(event);
    // });
    // synth.speak(utterance);
    console.log(target.textContent);
  }, []);

  return (
    <>
      <p className="App" id="test">
        This is some <strong>strong and then <i>italicized</i> text.</strong><br />
        Here is another text node after a line break. It contains 2 sentences.
      </p>
      <img src="https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png" alt="Lena Forsen" />
    </>
  );
}

export default App;
