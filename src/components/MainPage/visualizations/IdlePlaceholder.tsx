import type { VisualizationConfig } from "./types";

interface IdlePlaceholderProps {
  config: VisualizationConfig;
}

export function IdlePlaceholder({ config }: IdlePlaceholderProps) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: config.backgroundColor }}
    >
      {/* Ambient background gradient */}
      <div
        className="absolute inset-0 animate-[breathe_4s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(ellipse at center, ${config.primaryColor}15 0%, transparent 70%)`,
        }}
      />

      {/* Decorative lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(90deg, ${config.primaryColor}08 1px, transparent 1px),
            linear-gradient(${config.primaryColor}08 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Centered content */}
      <div className="relative text-center animate-[fadeIn_1s_ease-out]">
        <div
          className="text-[64px] mb-6 opacity-40 animate-[float_3s_ease-in-out_infinite]"
          style={{ color: config.primaryColor }}
        >
          ♪
        </div>

        <div
          className="font-['Playfair_Display',Georgia,serif] text-2xl font-normal mb-3 tracking-wide"
          style={{ color: config.primaryColor }}
        >
          Select a piece to begin
        </div>

        <div className="font-['Crimson_Text',Georgia,serif] text-sm text-white/40 italic">
          Experience classical music with immersive 3D visualizations
        </div>
      </div>
    </div>
  );
}
