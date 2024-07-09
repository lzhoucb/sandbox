import React, { useCallback, useEffect, useRef, useState } from "react";
import { ENDS_OF_SENTENCES, getMatchIndexes, printIndices, STARTS_OF_SENTENCES } from "./utility";

import "./App.css";
import { getPhrasesFromBlockElement, getSpeechTextFromPhrases } from "./get-speech-text";


function App() {
  const synth = window.speechSynthesis;

  useEffect(() => {
    console.clear();
  }, []);

  function handlePlay() {
    const target = document.getElementById("test");
    const phrases = getPhrasesFromBlockElement(target);
    const speechText = getSpeechTextFromPhrases(phrases);
    const utterance = new SpeechSynthesisUtterance(speechText.text);

    utterance.addEventListener("boundary", event => {
      console.log(event.charIndex);
      console.log(speechText.indexToPhrase.get(event.charIndex));
    });

    synth.cancel();
    synth.speak(utterance);
  }

  // const setVoiceToDefault = useCallback(() => {
  //   const voices = synthRef.current.getVoices();

  //   for (const voice of voices) {
  //     if (voice.default) {
  //       setVoice(voice);
  //     }
  //   }
  // }, [])

  // useEffect(() => {
  //   setVoiceToDefault();
  //   synthRef.current.addEventListener("voiceschanged", setVoiceToDefault);

  //   return () => {
  //     synthRef.current.removeEventListener("voiceschanged", setVoiceToDefault);
  //   }
  // }, [])

  return (
    <>
      <button onClick={handlePlay}>Play</button>
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
