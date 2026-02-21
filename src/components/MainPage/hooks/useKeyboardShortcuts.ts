import { useEffect } from "react";
import type { Piece } from "../types";

interface UseKeyboardShortcutsParams {
  list: Piece[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  playingIndex: number | null;
  stopPlayback: () => void;
  handlePlay: (piece: Piece, index: number) => void;
  handleGenerate: () => void;
}

export function useKeyboardShortcuts({
  list,
  selectedIndex,
  setSelectedIndex,
  playingIndex,
  stopPlayback,
  handlePlay,
  handleGenerate,
}: UseKeyboardShortcutsParams) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      )
        return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          if (playingIndex !== null) {
            stopPlayback();
          } else if (list.length > 0) {
            handlePlay(list[selectedIndex], selectedIndex);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(list.length - 1, prev + 1));
          break;
        case "n":
        case "N":
          handleGenerate();
          break;
        case "Escape":
          stopPlayback();
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playingIndex, selectedIndex, list, stopPlayback, handlePlay, handleGenerate, setSelectedIndex]);
}
