import React, { useCallback, useEffect, useRef, useState } from "react";
import { ENDS_OF_SENTENCES, endsWithPunctuation, getMatchIndexes, printIndices, STARTS_OF_SENTENCES } from "./utility";
import { getPhrasesFromBlockElement, getSpeechTextFromPhrases, Phrase, TextNodeChunk } from "./get-speech-text";

import "./App.css";
import { highlightPhrase, highlightPhraseChunk, highlightTextNodeChunk, unhighlightPhrase, unhighlightPhraseChunk } from "./highlight";


function App() {
  const synth = window.speechSynthesis;
  const prevPhraseRef = useRef<Phrase>(null);

  useEffect(() => {
    console.clear();
    const target = document.getElementById("test");
    const phrases = getPhrasesFromBlockElement(target);
    console.log(phrases);
  }, []);

  function handlePlay() {
    const target = document.getElementById("test");
    const phrases = getPhrasesFromBlockElement(target);
    const speechText = getSpeechTextFromPhrases(phrases);
    const utterance = new SpeechSynthesisUtterance(speechText.text);

    utterance.addEventListener("boundary", event => {
      const curPhrase = speechText.indexToPhrase.get(event.charIndex);

      if (curPhrase) {
        const prevPhrase = prevPhraseRef.current;

        if (prevPhrase) {
          unhighlightPhrase(prevPhrase);
        }

        prevPhraseRef.current = curPhrase;
        highlightPhrase(curPhrase);
      }
    });

    synth.cancel();
    synth.speak(utterance);
  }

  return (
    <>
      <button onClick={handlePlay}>Play</button>
      <p className="App" id="test">
        Sentence one. Sentence two! Sentence three? Phrase one followed by a line break<br />
        Sentence four, which has <strong>strong and then <i>italicized</i> text.</strong><br />
        Sentence five, which has high<span className="highlight">lighting starting and end</span>ing in the middle of a word. Phrase two
      </p>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Starry_Night_by_Jean-Fran%C3%A7ois_Millet.jpeg"
        alt="Starry Night by Jean-Francois Millet."
        width="400px"
      />
    </>
  );
}

export default App;
