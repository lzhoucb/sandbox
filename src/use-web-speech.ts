// import { useRef, useState, useEffect, useCallback } from "react";
// import { useAllowedVoices } from "./use-allowed-voices";

// export enum SpeechState {
//   Stopped,
//   Pending,
//   Playing,
//   Paused
// }

// export const useWebSpeech = () => {
//   const synth = window.speechSynthesis;

//   const curRef = useRef<Element>(null);
//   const visitedRef = useRef<Set<Element>>(new Set<Element>());

//   const [speechState, setSpeechState] = useState<SpeechState>(SpeechState.Stopped);
//   const [voice, setVoice] = useState<SpeechSynthesisVoice>(null);
//   const [speed, setSpeed] = useState<number>(null);
//   const [volume, setVolume] = useState<number>(null);

//   const allowedVoices = useAllowedVoices();

//   useEffect((): void => {
//     if (allowedVoices.size > 0) {
//       setVoice(allowedVoices.values().next().value);
//     }
//   }, [allowedVoices]);

//   function handlePending() {
//     const cur = curRef.current;

//     if (!cur) {
//       setSpeechState(SpeechState.Stopped);
//       return;
//     }

//     const visited = visitedRef.current;
//     visited.add(cur);
//     const utterance = new SpeechSynthesisUtterance(cur.text ?? " ");

//     utterance.addEventListener("start", () => {
//       setSpeechState(SpeechState.Playing);
//       highlight(cur.associatedElement);
//     });

//     utterance.addEventListener("pause", () => {
//       setSpeechState(SpeechState.Paused);
//     });

//     utterance.addEventListener("resume", () => {
//       setSpeechState(SpeechState.Playing);
//     });

//     utterance.addEventListener("end", () => {
//       setSpeechState(SpeechState.Pending);
//       unhighlight(cur.associatedElement);
//       curRef.current = getNext(cur, visited);
//     });

//     utterance.voice = voice;
//     utterance.volume = volume;
//     utterance.rate = speed;
//     synth.speak(utterance);
//   }

//   useEffect(() => {
//     if (speechState === SpeechState.Pending) {
//       handlePending();
//     }
//   }, [speechState]);

//   const play = useCallback((start: Element) => {
//     stop();
//     curRef.current = new Track(start);
//     setSpeechState(SpeechState.Pending);
//   }, []);

//   const pause = useCallback(() => {
//     synth.pause();
//   }, []);

//   const resume = useCallback(() => {
//     synth.resume();
//   }, []);

//   const stop = useCallback(() => {
//     synth.cancel();

//     if (curRef.current) {
//       unhighlight(curRef.current.associatedElement);
//     }

//     curRef.current = null;
//     visitedRef.current.clear();
//     setSpeechState(SpeechState.Stopped);
//   }, []);

//   return {
//     speechState,
//     voice,
//     speed,
//     volume,
//     allowedVoices,
//     setVoice,
//     setSpeed,
//     setVolume,
//     play,
//     pause,
//     resume,
//     stop
//   };
// };
