import React, { useEffect } from "react";
import { printIndices } from "./utility";
import { getTextChunksFromBlockElement } from "./text-chunk";
import { getPhrasesFromBlockElement } from "./phrase";

const synth = window.speechSynthesis;

function App() {
  useEffect(() => {
    console.clear();
    const target = document.getElementById("test");
    console.log(target.childNodes);
    console.log(getTextChunksFromBlockElement(target));
    console.log(getPhrasesFromBlockElement(target));
  }, []);

  return (
    <>
      <button>Play</button>
      <p className="App" id="test">
        This is some <strong>strong and then <i>italicized</i> text.</strong><br />
        Here is another text node after a line break. It contains a sentence and then a phrase which doesn't end with punctuation
      </p>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/1a/John_Singer_Sargent_-_A_Parisian_Beggar_Girl.jpg"
        alt="A Parisian Beggar Girl, by John Singer Sargent."
      />
    </>
  );
}

export default App;
