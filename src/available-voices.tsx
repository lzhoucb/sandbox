import React, { useEffect, useState } from "react";
import { RadioGroup } from "./radio";

const synth = window.speechSynthesis;

export const AvailableVoices = () => {
  const [voices, setVoices] = useState(synth.getVoices());
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    const handleVoicesChanged = () => {
      setVoices(synth.getVoices());
    }

    synth.addEventListener("voiceschanged", handleVoicesChanged);
    return () => synth.removeEventListener("voiceschanged", handleVoicesChanged);
  }, []);

  const voiceList = voices
    .filter(voice => voice.lang.split("-")[0] === language)
    .sort((a, b) => a.lang.localeCompare(b.lang))
    .map((voice, index) => <Voice voice={voice} key={index} />);

  return (
    <>
      <RadioGroup
        name="language"
        curValue={language}
        setValue={setLanguage}
        table={[
          { value: "fr", label: "fr", idSuffix: "fr" },
          { value: "it", label: "it", idSuffix: "it" },
          { value: "de", label: "de", idSuffix: "de" },
          { value: "es", label: "es", idSuffix: "es" },
          { value: "zh", label: "zh (two-letter code for Chinese)", idSuffix: "zh" },
          { value: "cmn", label: "cmn (three-letter code for Mandarin)", idSuffix: "cmn" },
          { value: "ja", label: "ja", idSuffix: "ja" }
        ]}
      />
      {voiceList}
    </>
  );
}

const languageToSentence = new Map([
  ["fr", "Le renard brun rapide saute par-dessus le chien paresseux."],
  ["it", "La volpe marrone salta velocemente sopra il cane pigro."],
  ["de", "Der schnelle braune Fuchs springt über den faulen Hund."],
  ["es", "El rápido zorro marrón salta sobre el perro perezoso."],
  ["zh", "敏捷的棕色狐狸跳过了懒狗。"],
  ["cmn", "敏捷的棕色狐狸跳过了懒狗。"],
  ["ja", "素早い茶色のキツネが怠け者の犬を飛び越えます。"]
]);

const Voice = ({ voice }) => {
  const language = voice.lang.split("-")[0];

  const onPlay = () => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(languageToSentence.get(language));
    utterance.voice = voice;
    synth.speak(utterance);
  }

  return (
    <div>
      <button style={{ display: "inline" }} onClick={onPlay}>Play</button>
      <p style={{ display: "inline" }}>name: {voice.name}; lang: {voice.lang}; local: {voice.localService ? "yes" : "no"}</p>
    </div>
  );
}