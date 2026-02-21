import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import type { Piece, EffectNodes, MultiSynthResult } from "../types";
import type { NoteEvent } from "../visualizations/types";
import {
  buildSynth,
  buildSingleSynth,
  getVelocityCurve,
} from "../../../utils/synthBuilder";

export function usePlayback() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const synthRef = useRef<MultiSynthResult["cleanup"] | null>(null);
  const [analyser, setAnalyser] = useState<Tone.Analyser | null>(null);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const partsRef = useRef<Tone.Part[]>([]);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [recentNotes, setRecentNotes] = useState<string[]>([]);
  const [effects, setEffects] = useState<EffectNodes | null>(null);
  const [noteEvents, setNoteEvents] = useState<NoteEvent[]>([]);

  const stopPlayback = useCallback(() => {
    partsRef.current.forEach((part) => {
      part.stop();
      part.dispose();
    });
    partsRef.current = [];

    if (synthRef.current) {
      synthRef.current();
      synthRef.current = null;
    }
    Tone.getTransport().stop();
    Tone.getTransport().cancel();
    setPlayingIndex(null);
    setAnalyser(null);
    setCurrentPiece(null);
    setCurrentNote(null);
    setRecentNotes([]);
    setEffects(null);
    setNoteEvents([]);
  }, []);

  useEffect(() => () => stopPlayback(), [stopPlayback]);

  function emitNoteEvent(
    note: string,
    layer: NoteEvent["layer"],
    velocity: number,
  ) {
    const event: NoteEvent = { note, layer, timestamp: Date.now(), velocity };
    setNoteEvents((prev) => [event, ...prev].slice(0, 20));
  }

  function schedulePart(
    synth: any,
    notes: string[],
    durations: string[],
    startTime: number,
    velocities?: number[],
    mood: string = "Neutral",
    onNotePlayed?: (note: string) => void,
    isMelody: boolean = true,
    layer?: NoteEvent["layer"],
  ): Tone.Part {
    const events: [number, { note: string; dur: string; vel: number }][] = [];
    let cumulativeTime = 0;

    const vels = velocities || getVelocityCurve(mood, notes.length);
    const overlapFactor = isMelody ? 1.15 : 1.25;

    for (let i = 0; i < notes.length; i++) {
      const durSec = Tone.Time(durations[i]).toSeconds();

      const jitter = (Math.random() - 0.5) * 0.03;
      const swing = i % 2 === 1 ? 0.008 : 0;
      const humanOffset = jitter + swing;

      const time = startTime + cumulativeTime + humanOffset;

      const isRest =
        notes[i] === "R" || notes[i].startsWith("R") || vels[i] === 0;
      if (!isRest) {
        const extendedDurSec = durSec * overlapFactor;
        const extendedDur = extendedDurSec.toFixed(4) + "s";

        events.push([
          Math.max(0, time),
          { note: notes[i], dur: extendedDur, vel: vels[i] },
        ]);
      }
      cumulativeTime += durSec;
    }

    const part = new Tone.Part((time, { note, dur, vel }) => {
      synth.triggerAttackRelease(note, dur, time, vel);
      Tone.getDraw().schedule(() => {
        if (onNotePlayed) onNotePlayed(note);
        if (layer) emitNoteEvent(note, layer, vel);
      }, time);
    }, events);

    part.start(0);
    return part;
  }

  function handleNotePlayed(note: string) {
    setCurrentNote(note);
    setRecentNotes((prev) => [note, ...prev].slice(0, 5));
  }

  async function handlePlay(piece: Piece, index: number) {
    // CRITICAL: Tone.start() must be the first thing called in the user gesture
    // call stack. On iOS Safari, any async work before this will break AudioContext resume.
    const startPromise = Tone.start();

    // Also explicitly resume the raw AudioContext for iOS compatibility
    const ctx = Tone.getContext().rawContext;
    if (ctx.state !== "running") {
      (ctx as AudioContext).resume?.();
    }

    await startPromise;

    stopPlayback();

    const newAnalyser = new Tone.Analyser("fft", 256);
    setAnalyser(newAnalyser);
    setCurrentPiece(piece);

    const hasHarmony = piece.bass && piece.chords;

    let cleanup: () => void;

    Tone.getTransport().bpm.value = piece.tempo;

    let totalDuration = 0;
    for (const dur of piece.durations) {
      totalDuration += Tone.Time(dur).toSeconds();
    }

    let melodySynth: any;
    let bassSynth: any;
    let chordsSynth: any;
    let loaded: Promise<void>;

    if (hasHarmony) {
      const multiSynth = buildSynth(newAnalyser, piece.tempo);
      melodySynth = multiSynth.melody;
      bassSynth = multiSynth.bass;
      chordsSynth = multiSynth.chords;
      cleanup = multiSynth.cleanup;
      loaded = multiSynth.loaded;
      setEffects(multiSynth.effects);
    } else {
      const singleSynth = buildSingleSynth(newAnalyser);
      melodySynth = singleSynth.synth;
      loaded = singleSynth.loaded;
      cleanup = singleSynth.cleanup;
    }

    synthRef.current = cleanup;
    setPlayingIndex(index);

    // Wait for piano samples to fully load before scheduling
    await loaded;

    // Re-check AudioContext state after sample loading (iOS can suspend it again)
    if (Tone.getContext().rawContext.state !== "running") {
      await (Tone.getContext().rawContext as AudioContext).resume?.();
    }

    const melodyPart = schedulePart(
      melodySynth,
      piece.notes,
      piece.durations,
      0,
      piece.velocities,
      piece.mood,
      handleNotePlayed,
      true,
      "melody",
    );
    partsRef.current.push(melodyPart);

    if (hasHarmony && bassSynth && chordsSynth) {
      const bassPart = schedulePart(
        bassSynth,
        piece.bass!.notes,
        piece.bass!.durations,
        0,
        piece.bass!.velocities,
        piece.mood,
        undefined,
        false,
        "bass",
      );
      const chordsPart = schedulePart(
        chordsSynth,
        piece.chords!.notes,
        piece.chords!.durations,
        0,
        piece.chords!.velocities,
        piece.mood,
        undefined,
        false,
        "chords",
      );
      partsRef.current.push(bassPart, chordsPart);
    }

    partsRef.current.forEach((part) => {
      part.loop = true;
      part.loopEnd = totalDuration;
    });

    Tone.getTransport().start();
  }

  return {
    playingIndex,
    analyser,
    currentPiece,
    currentNote,
    recentNotes,
    effects,
    noteEvents,
    stopPlayback,
    handlePlay,
  };
}
