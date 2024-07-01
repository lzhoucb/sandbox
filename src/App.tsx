import React, { useEffect } from "react";
import { printIndices } from "./utility";
import { getTextChunksFromTextNode } from "./text-chunk";
import { getTextChunksFromBlockElement } from "./get-text-chunks";

const synth = window.speechSynthesis;

function App() {
  useEffect(() => {
    console.clear();
    const target = document.getElementById("test");
    console.log(target.childNodes);
    console.log(getTextChunksFromBlockElement(target));
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
