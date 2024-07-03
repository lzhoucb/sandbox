import { useState, useCallback, useEffect } from "react";

const ALLOWED_VOICE_NAMES = ["Samantha", "Aaron"];

export const useAllowedVoices = () => {
  const synth = window.speechSynthesis;
  const [allowedVoices, setAllowedVoices] = useState<Map<string, SpeechSynthesisVoice>>(new Map());

  const getAllowedVoices = useCallback((): void => {
    const voices = synth.getVoices();

    for (const allowedVoiceName of ALLOWED_VOICE_NAMES) {
      const voice = voices.find(voice => voice.name === allowedVoiceName);

      if (voice) {
        setAllowedVoices(allowedVoices.set(voice.name, voice));
      }
    }
  }, []);

  useEffect(() => {
    getAllowedVoices();
    synth.addEventListener("voiceschanged", getAllowedVoices);

    return () => {
      synth.removeEventListener("voiceschanged", getAllowedVoices);
    };
  }, [allowedVoices]);

  return allowedVoices;
};

