import React, { useEffect } from "react";
import { printIndices } from "./utility";
import { getTextChunksFromBlockElement, highlightTextChunk } from "./text-chunk";
import { getPhrasesFromBlockElement } from "./phrase";
import { getPlaylist } from "./playlist";
import { useWebSpeech } from "./use-web-speech";

import "./App.css";

const synth = window.speechSynthesis;

function App() {
  const { play } = useWebSpeech();

  function handlePlay() {
    play(null);
  }

  useEffect(() => {
    console.clear();
    const target = document.getElementById("test");
    const chunks = getTextChunksFromBlockElement(target);
    highlightTextChunk(chunks[5]);
  }, []);

  return (
    <>
      <button onClick={handlePlay}>Play</button>
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
