interface WaveVizProps {
  playing: boolean;
  color: string;
}

export function WaveViz({ playing, color }: WaveVizProps) {
  const bars = 18;
  return (
    <div className="flex items-center gap-0.5 h-6">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm min-h-1 max-h-[22px]"
          style={{
            background: color,
            height: playing ? undefined : "4px",
            animation: playing
              ? `wave${i % 5} ${0.4 + (i % 3) * 0.15}s ease-in-out infinite alternate`
              : "none",
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}
