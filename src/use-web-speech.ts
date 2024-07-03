import { useRef, useState, useEffect, useCallback } from "react";
import { useAllowedVoices } from "./use-allowed-voices";
import { Playlist, getPlaylist } from "./playlist";

const ROOT_ELEMENT = document.body;

export enum SpeechState {
  Stopped,
  Pending,
  Playing,
  Paused
}

export const useWebSpeech = () => {
  const synth = window.speechSynthesis;

  const playlistRef = useRef<Playlist>(null);
  const playlistIndexRef = useRef<number>(null);

  const [speechState, setSpeechState] = useState<SpeechState>(SpeechState.Stopped);
  const [voice, setVoice] = useState<SpeechSynthesisVoice>(null);
  const [speed, setSpeed] = useState<number>(null);
  const [volume, setVolume] = useState<number>(null);

  const allowedVoices = useAllowedVoices();

  useEffect((): void => {
    if (allowedVoices.size > 0) {
      setVoice(allowedVoices.values().next().value);
    }
  }, [allowedVoices]);

  function handlePending() {
    const playlist = playlistRef.current;

    if (!playlist) {
      return;
    }

    const playlistIndex = playlistIndexRef.current;

    if (playlistIndex === null || playlistIndex < 0 || playlistIndex >= playlist.length) {
      setSpeechState(SpeechState.Stopped);
      return;
    }

    const phrase = playlist[playlistIndex];
    console.log(phrase);
    const utterance = new SpeechSynthesisUtterance(phrase.text ?? " ");

    utterance.addEventListener("start", () => {
      setSpeechState(SpeechState.Playing);
      // highlight(cur.associatedElement);
    });

    utterance.addEventListener("pause", () => {
      setSpeechState(SpeechState.Paused);
    });

    utterance.addEventListener("resume", () => {
      setSpeechState(SpeechState.Playing);
    });

    utterance.addEventListener("end", () => {
      setSpeechState(SpeechState.Pending);
      ++playlistIndexRef.current;
      // unhighlight(cur.associatedElement);
      // curRef.current = getNext(cur, visited);
    });

    // utterance.voice = voice;
    // utterance.volume = volume;
    // utterance.rate = speed;
    synth.speak(utterance);
  }

  useEffect(() => {
    if (speechState === SpeechState.Pending) {
      handlePending();
    }
  }, [speechState]);

  const play = useCallback((start: Element) => {
    stop();
    playlistRef.current = getPlaylist(ROOT_ELEMENT);
    setSpeechState(SpeechState.Pending);
  }, []);

  const pause = useCallback(() => {
    synth.pause();
  }, []);

  const resume = useCallback(() => {
    synth.resume();
  }, []);

  const stop = useCallback(() => {
    synth.cancel();
    playlistIndexRef.current = 0;
    setSpeechState(SpeechState.Stopped);
  }, []);

  return {
    speechState,
    voice,
    speed,
    volume,
    allowedVoices,
    setVoice,
    setSpeed,
    setVolume,
    play,
    pause,
    resume,
    stop
  };
};
