import { useState, useCallback } from "react";
import type { EffectNodes } from "./types";

interface MixerPanelProps {
  effects: EffectNodes | null;
}

interface SliderConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
  onChange: (value: number, effects: EffectNodes) => void;
}

const sliders: SliderConfig[] = [
  {
    label: "Melody",
    min: -30,
    max: 6,
    step: 1,
    defaultValue: -3,
    unit: "dB",
    onChange: (v, fx) => { fx.melodyVolume.volume.value = v; },
  },
  {
    label: "Bass",
    min: -30,
    max: 6,
    step: 1,
    defaultValue: -6,
    unit: "dB",
    onChange: (v, fx) => { fx.bassVolume.volume.value = v; },
  },
  {
    label: "Chords",
    min: -30,
    max: 6,
    step: 1,
    defaultValue: -10,
    unit: "dB",
    onChange: (v, fx) => { fx.chordsVolume.volume.value = v; },
  },
  {
    label: "Reverb",
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0.35,
    unit: "",
    onChange: (v, fx) => { fx.reverb.wet.value = v; },
  },
  {
    label: "Delay",
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0.18,
    unit: "",
    onChange: (v, fx) => { fx.pingPongDelay.wet.value = v; },
  },
  {
    label: "Chorus",
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0.2,
    unit: "",
    onChange: (v, fx) => { fx.chorus.wet.value = v; },
  },
];

export function MixerPanel({ effects }: MixerPanelProps) {
  const [values, setValues] = useState(() => sliders.map((s) => s.defaultValue));

  const handleChange = useCallback(
    (index: number, raw: string) => {
      const v = parseFloat(raw);
      setValues((prev) => {
        const next = [...prev];
        next[index] = v;
        return next;
      });
      if (effects) sliders[index].onChange(v, effects);
    },
    [effects],
  );

  if (!effects) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <span style={{ color: "#7D6B91", fontSize: 13, fontStyle: "italic" }}>
          Play a piece to enable the mixer
        </span>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
      <h3 style={{ margin: 0, fontSize: 14, color: "#989FCE", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Mixer
      </h3>
      {sliders.map((s, i) => (
        <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#989FCE" }}>{s.label}</span>
            <span style={{ fontSize: 11, color: "#7D6B91" }}>
              {s.unit === "dB" ? `${values[i]}dB` : values[i].toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={values[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            style={{ width: "100%", accentColor: "#347FC4" }}
          />
        </div>
      ))}
    </div>
  );
}
