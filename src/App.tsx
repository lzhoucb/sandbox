import React, { useEffect } from "react";
import { END_OF_SENTENCE, getMatchIndexes, printIndices } from "./utility";

import "./App.css";
import { getPhrasesFromBlockElement } from "./get-speech-text";

const synth = window.speechSynthesis;

function App() {
  useEffect(() => {
    console.clear();
    const target = document.getElementById("test");
    console.log(target.textContent);
    printIndices(target.textContent);
    console.log(getPhrasesFromBlockElement(target))
  }, []);

  return (
    <>
      {/* <button onClick={handlePlay}>Play</button> */}
      <p className="App" id="test">
        Sentence one. Sentence two! Sentence three? Phrase one
      </p>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/1a/John_Singer_Sargent_-_A_Parisian_Beggar_Girl.jpg"
        alt="A Parisian Beggar Girl, by John Singer Sargent."
      />
    </>
  );
}

export default App;
