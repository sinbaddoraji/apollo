import { useState } from "react";
import type { Piece } from "../types";
import { generateSong } from "../../../utils/musicGenerator";

export function useGeneration() {
  const [generated, setGenerated] = useState<Piece[]>([]);
  const [justGenerated, setJustGenerated] = useState(false);

  function handleGenerate() {
    const song = generateSong();
    setGenerated((prev) => [song, ...prev]);
    setJustGenerated(true);
    setTimeout(() => setJustGenerated(false), 100);
  }

  return { generated, justGenerated, handleGenerate };
}
