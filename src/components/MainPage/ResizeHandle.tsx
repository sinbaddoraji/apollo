import { Separator } from "react-resizable-panels";

interface ResizeHandleProps {
  id?: string;
  side: "left" | "right";
  isCollapsed: boolean;
  onToggle?: () => void;
}

export function ResizeHandle({ id, side, isCollapsed, onToggle }: ResizeHandleProps) {
  // When collapsed, arrow points toward center (expand). When open, arrow points toward sidebar (collapse).
  const arrowLabel = isCollapsed
    ? side === "left" ? "›" : "‹"
    : side === "left" ? "‹" : "›";
  const tooltip = isCollapsed ? "Expand panel" : "Collapse panel";

  return (
    <Separator
      id={id}
      className="group relative flex items-center justify-center w-[8px] bg-transparent hover:bg-border-strong/50 transition-colors duration-150 data-[resize-handle-active]:bg-blue/30"
    >
      {/* Drag dots — visible on hover */}
      <div className="flex flex-col gap-[3px] opacity-0 group-hover:opacity-60 transition-opacity duration-150">
        <span className="block w-[3px] h-[3px] rounded-full bg-lavender" />
        <span className="block w-[3px] h-[3px] rounded-full bg-lavender" />
        <span className="block w-[3px] h-[3px] rounded-full bg-lavender" />
      </div>

      {/* Collapse/expand button — always visible */}
      {onToggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          title={tooltip}
          className="absolute z-10 flex items-center justify-center w-7 h-9 rounded bg-navy border border-border-strong hover:border-blue hover:bg-surface-hover text-light cursor-pointer transition-all duration-150 shadow-md hover:shadow-lg"
          style={{
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {arrowLabel}
        </button>
      )}
    </Separator>
  );
}
