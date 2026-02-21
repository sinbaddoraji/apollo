import { useState, useCallback, type ReactNode, type DragEvent } from "react";

type PanelId = "pieces" | "mixer";

interface PanelConfig {
  id: PanelId;
  title: string;
  content: ReactNode;
}

interface PanelLayoutProps {
  piecesContent: ReactNode;
  visualizationContent: ReactNode;
  mixerContent: ReactNode;
  onGenerate?: () => void;
  onStop?: () => void;
  isPlaying?: boolean;
}

function DraggableSidebarHeader({
  panelId,
  title,
  onDragStart,
  onDrop,
  action,
}: {
  panelId: PanelId;
  title: string;
  onDragStart: (id: PanelId) => void;
  onDrop: (targetId: PanelId) => void;
  action?: ReactNode;
}) {
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(panelId)}
      onDragOver={handleDragOver}
      onDrop={() => onDrop(panelId)}
      className="flex items-center gap-2 px-4 py-2 border-b border-border cursor-grab active:cursor-grabbing select-none"
      style={{ background: "rgba(39,40,56,0.8)" }}
    >
      <span className="text-lavender text-[10px] tracking-wider">⠿</span>
      <span className="text-periwinkle text-xs tracking-[0.08em] uppercase font-medium">
        {title}
      </span>
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}

function PiecesActions({
  onGenerate,
  onStop,
  isPlaying,
}: {
  onGenerate: () => void;
  onStop?: () => void;
  isPlaying?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {isPlaying && onStop && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStop();
          }}
          title="Stop playback"
          className="flex items-center gap-1 rounded-md text-[11px] font-medium tracking-wide border-none cursor-pointer transition-all duration-200"
          style={{
            padding: "3px 8px",
            background: "rgba(125,107,145,0.2)",
            color: "#E8E9F3",
            border: "1px solid rgba(125,107,145,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(125,107,145,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(125,107,145,0.2)";
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><rect width="8" height="8"/></svg>
          <span>Stop</span>
        </button>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onGenerate();
        }}
        title="Generate new piece"
        className="flex items-center gap-1.5 rounded-md text-[11px] font-medium tracking-wide border-none cursor-pointer transition-all duration-200"
        style={{
          padding: "3px 10px 3px 7px",
          background: "#347FC4",
          color: "#E8E9F3",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#3d8ed8";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(52,127,196,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#347FC4";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <span className="text-sm leading-none">+</span>
        <span>New</span>
      </button>
    </div>
  );
}

function MobileTabBar({
  activeTab,
  onTabChange,
  onGenerate,
  onStop,
  isPlaying,
}: {
  activeTab: "pieces" | "visualizations" | "mixer";
  onTabChange: (tab: "pieces" | "visualizations" | "mixer") => void;
  onGenerate?: () => void;
  onStop?: () => void;
  isPlaying?: boolean;
}) {
  const tabs = [
    { id: "pieces" as const, label: "Pieces" },
    { id: "visualizations" as const, label: "Visuals" },
    { id: "mixer" as const, label: "Mixer" },
  ];

  return (
    <div className="flex items-center border-b border-border md:hidden" style={{ background: "rgba(39,40,56,0.8)" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex-1 py-2.5 text-xs tracking-[0.08em] uppercase font-medium border-none cursor-pointer transition-colors duration-200"
          style={{
            background: activeTab === tab.id ? "rgba(93,83,107,0.2)" : "transparent",
            color: activeTab === tab.id ? "#E8E9F3" : "#989FCE",
            borderBottom: activeTab === tab.id ? "2px solid #347FC4" : "2px solid transparent",
          }}
        >
          {tab.label}
        </button>
      ))}
      {onGenerate && activeTab === "pieces" && (
        <div className="px-3 shrink-0">
          <PiecesActions onGenerate={onGenerate} onStop={onStop} isPlaying={isPlaying} />
        </div>
      )}
    </div>
  );
}

export function PanelLayout({
  piecesContent,
  visualizationContent,
  mixerContent,
  onGenerate,
  onStop,
  isPlaying,
}: PanelLayoutProps) {
  const [order, setOrder] = useState<[PanelId, PanelId]>(["pieces", "mixer"]);
  const [dragSource, setDragSource] = useState<PanelId | null>(null);
  const [mobileTab, setMobileTab] = useState<"pieces" | "visualizations" | "mixer">("pieces");

  const handleDragStart = useCallback((id: PanelId) => {
    setDragSource(id);
  }, []);

  const handleDrop = useCallback(
    (targetId: PanelId) => {
      if (dragSource && dragSource !== targetId) {
        setOrder((prev) => [prev[1], prev[0]]);
      }
      setDragSource(null);
    },
    [dragSource],
  );

  const panels: Record<PanelId, PanelConfig> = {
    pieces: { id: "pieces", title: "Pieces", content: piecesContent },
    mixer: { id: "mixer", title: "Mixer", content: mixerContent },
  };

  const getAction = (panelId: PanelId) => {
    if (panelId === "pieces" && onGenerate) {
      return <PiecesActions onGenerate={onGenerate} onStop={onStop} isPlaying={isPlaying} />;
    }
    return undefined;
  };

  const leftPanel = panels[order[0]];
  const rightPanel = panels[order[1]];

  return (
    <>
      {/* Mobile tab bar */}
      <MobileTabBar activeTab={mobileTab} onTabChange={setMobileTab} onGenerate={onGenerate} onStop={onStop} isPlaying={isPlaying} />

      {/* Mobile layout */}
      <div className="flex flex-col h-full w-full overflow-hidden md:hidden">
        {mobileTab === "pieces" && (
          <div className="flex-1 overflow-y-auto" style={{ background: "rgba(39,40,56,0.4)" }}>
            {piecesContent}
          </div>
        )}
        {mobileTab === "visualizations" && (
          <div className="flex-1 min-w-0 overflow-hidden">
            {visualizationContent}
          </div>
        )}
        {mobileTab === "mixer" && (
          <div className="flex-1 overflow-y-auto" style={{ background: "rgba(39,40,56,0.6)" }}>
            {mixerContent}
          </div>
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex h-full w-full overflow-hidden">
        {/* Left Sidebar */}
        <div className="h-full flex flex-col overflow-hidden" style={{ width: "22%", minWidth: 0, background: "rgba(39,40,56,0.4)" }}>
          <DraggableSidebarHeader
            panelId={leftPanel.id}
            title={leftPanel.title}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            action={getAction(leftPanel.id)}
          />
          <div className="flex-1 overflow-y-auto">{leftPanel.content}</div>
        </div>

        <div className="w-[1px] bg-border-strong/50 flex-shrink-0" />

        {/* Center */}
        <div className="flex-1 min-w-0 h-full overflow-hidden">
          {visualizationContent}
        </div>

        <div className="w-[1px] bg-border-strong/50 flex-shrink-0" />

        {/* Right Sidebar */}
        <div className="h-full flex flex-col overflow-hidden" style={{ width: "18%", minWidth: 0, background: "rgba(39,40,56,0.6)" }}>
          <DraggableSidebarHeader
            panelId={rightPanel.id}
            title={rightPanel.title}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            action={getAction(rightPanel.id)}
          />
          <div className="flex-1 overflow-y-auto">{rightPanel.content}</div>
        </div>
      </div>
    </>
  );
}
