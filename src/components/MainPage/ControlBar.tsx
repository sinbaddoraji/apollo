interface ControlBarProps {
  onStop: () => void;
  playingIndex: number | null;
  statusText: string;
}

export function ControlBar({
  onStop,
  playingIndex,
  statusText,
}: ControlBarProps) {
  return (
    <div
      className="border-b border-border flex gap-3 sm:gap-4 items-center px-4 py-2.5 sm:px-8 sm:py-3 md:px-14 md:py-4"
    >
      <button
        onClick={onStop}
        disabled={playingIndex === null}
        className="text-sm rounded-sm transition-all duration-200"
        style={{
          padding: "6px 14px",
          background:
            playingIndex !== null ? "rgba(125,107,145,0.15)" : "transparent",
          color: playingIndex !== null ? "#E8E9F3" : "#7D6B91",
          border: `1px solid ${playingIndex !== null ? "rgba(125,107,145,0.35)" : "rgba(125,107,145,0.25)"}`,
          cursor: playingIndex !== null ? "pointer" : "not-allowed",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style={{display:'inline',verticalAlign:'middle',marginRight:'4px'}}><rect width="10" height="10"/></svg>
        Stop
      </button>

      <span className="ml-auto text-sm text-lavender italic">
        {statusText}
        <span className="hidden md:inline">
          {" · "}
          <span style={{ fontSize: 11, opacity: 0.7 }}>
            Space: play/pause · ↑↓: navigate · N: new · Esc: stop
          </span>
        </span>
      </span>
    </div>
  );
}
