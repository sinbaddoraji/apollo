# Apollo

A classical music studio for the browser. Apollo plays famous piano compositions with real-time 3D visualizations that react to the music, interactive sheet music notation, and a procedural music generator — all running client-side.

## Features

- **10 Classical Compositions** — Moonlight Sonata, Clair de Lune, Swan Lake, Eine Kleine Nachtmusik, and more, each with 200+ notes across melody, bass, and chord layers
- **Real-Time 3D Visualizations** — Four visualization modes (particle field, cube field, abstract waveform, 3D waveform) driven by FFT audio analysis with beat detection
- **Interactive Sheet Music** — Click any measure to start playback from that point, with live note highlighting and a progress bar
- **Music Generator** — Procedurally generates original piano pieces with mood-based parameters, chord progressions, and melodic patterns
- **Mixer Panel** — Per-layer volume controls (melody, bass, chords) and reverb amount
- **Mood-Driven Themes** — Each piece's mood (triumphant, melancholic, serene, dramatic, etc.) controls visualization colors, particle behavior, and animation intensity
- **Responsive Design** — Full mobile support with tab-based navigation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Audio | Tone.js (Salamander Grand Piano samples) |
| 3D Graphics | Three.js via @react-three/fiber + @react-three/drei |
| Post-Processing | @react-three/postprocessing (bloom, chromatic aberration, vignette) |
| Sheet Music | VexFlow 5 |
| Layout | react-resizable-panels |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

The app opens at `http://localhost:5173`. Click any piece to start playback — audio requires a user interaction to initialize (browser policy).

## Project Structure

```
src/
├── App.tsx                        # Entry point, piano sample preloading
├── components/MainPage/
│   ├── Index.tsx                   # Main page: playback logic, layout composition
│   ├── Header.tsx                  # App header
│   ├── PanelLayout.tsx             # 3-column resizable layout (mobile: tab bar)
│   ├── PieceCard.tsx               # Individual piece row
│   ├── PieceList.tsx               # Scrollable piece list
│   ├── SheetMusicModal.tsx         # Interactive sheet music modal
│   ├── MixerPanel.tsx              # Volume/reverb controls
│   ├── ControlBar.tsx              # Playback status display
│   ├── hooks/
│   │   ├── usePlayback.ts          # Tone.js playback management
│   │   ├── useGeneration.ts        # Music generation hook
│   │   └── useKeyboardShortcuts.ts # Keyboard shortcut bindings
│   └── visualizations/
│       ├── VisualizationsPanel.tsx  # Visualization container + mode switcher
│       ├── AudioAnalyzer.ts        # FFT analysis with beat detection
│       ├── ParticleField.tsx       # Particle system with beat bursts
│       ├── CubeField.tsx           # Instanced cube grid
│       ├── AbstractWaveform.tsx    # GLSL shader-driven waveform
│       ├── 3DWaveformCanvas.tsx    # 3D frequency bars
│       ├── PostProcessingEffects.tsx # Bloom, chromatic aberration, vignette
│       ├── moodConfigs.ts          # Color/animation configs per mood
│       ├── NoteOrb.tsx             # Floating note indicator
│       ├── NoteOverlay.tsx         # 2D note name overlay
│       ├── PianoKeyboard.tsx       # 3D piano keyboard
│       ├── DynamicCamera.tsx       # Audio-reactive camera
│       └── IdlePlaceholder.tsx     # Idle state display
├── data/
│   ├── classicalPieces.ts          # Piece registry
│   ├── musicConstants.ts           # Scales, keys, moods, intervals
│   └── pieces/                     # 10 classical compositions
└── utils/
    ├── musicGenerator.ts           # Procedural music generation
    └── synthBuilder.ts             # Tone.js instrument construction
```

## Audio Architecture

```
Tone.Sampler (Salamander Piano)
  ├── Melody → Volume → Analyser → Reverb → Destination
  ├── Bass   → Volume →                   → Destination
  └── Chords → Volume →                   → Destination
```

The `AudioAnalyzer` hook runs at 60fps, splitting FFT data into bass/mid/treble bands and computing peak levels, bass delta, and energy delta for beat-reactive animations.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Stop |
| `N` | Generate new piece |
| `1-4` | Switch visualization mode |
| `Escape` | Close sheet music modal |

## License

MIT
