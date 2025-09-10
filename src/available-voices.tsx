import React, { useEffect, useState } from "react";
import { RadioGroup } from "./radio";

export const AvailableVoices = () => {
  const [voices, setVoices] = useState(null);
  const [language, setLanguage] = useState("fr");
  const [name, setName] = useState("");
  const [isLocalOnly, setIsLocalOnly] = useState(null);

  useEffect(() => {
    const getVoices = () => {
      setVoices(window?.speechSynthesis?.getVoices() ?? []);
    }

    const interval = setInterval(getVoices, 1000);
    return () => clearInterval(interval);
  }, []);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const voiceFilter = (voice: SpeechSynthesisVoice) => {
    return voice.lang.split("-")[0] === language
      && voice.name.toLowerCase().startsWith(name.toLowerCase())
      && (isLocalOnly ? voice.localService : true);
  }

  const voiceRows = voices && voices
    .filter(voiceFilter)
    .sort((a, b) => a.lang.localeCompare(b.lang))
    .map((voice, index) => <VoiceRow voice={voice} key={index} />);

  const voiceTable = voiceRows && <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>lang</th>
        <th>Is Local?</th>
      </tr>
    </thead>
    <tbody>
      {voiceRows}
    </tbody>
  </table>

  return (
    <>
      <div style={{ display: "inline-block", paddingRight: "10px", verticalAlign: "top" }}>
        <h1>Language</h1>
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
        <h1>Name</h1>
        <input type="text" placeholder="Type a name to search..." onChange={onNameChange}></input>
        <h1>Local only?</h1>
        <input type="checkbox" onChange={(event) => setIsLocalOnly(event.target.checked)}></input>
      </div>
      <div style={{ display: "inline-block" }}>
        {voiceTable === null ? "Loading..." : voiceRows.length === 0 ? "No voices found." : voiceTable}
      </div>
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

const VoiceRow = ({ voice }) => {
  const language = voice.lang.split("-")[0];

  const onPlay = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(languageToSentence.get(language));
    utterance.voice = voice;
    synth.speak(utterance);
  }

  return (
    <tr>
      <td>
        <button style={{ display: "inline" }} onClick={onPlay}>Play</button>
      </td>
      <td>{voice.name}</td>
      <td>{voice.lang}</td>
      <td>{voice.localService ? "✅" : "❌"}</td>
    </tr>
  );
}