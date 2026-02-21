interface TabsHeaderProps {
  tab: string;
  onTabChange: (tab: string) => void;
  classicalPiecesCount: number;
  generatedCount: number;
}

export function TabsHeader({
  tab,
  onTabChange,
  classicalPiecesCount,
  generatedCount,
}: TabsHeaderProps) {
  const tabs = [
    { id: "examples", label: "Classic Pieces", count: classicalPiecesCount },
    { id: "generated", label: "AI Generated", count: generatedCount },
  ];

  return (
    <div
      className="border-b border-border flex"
      style={{ padding: "20px 56px" }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onTabChange(t.id)}
          className="text-base cursor-pointer transition-all duration-200 flex items-center gap-2"
          style={{
            padding: "10px 20px",
            background: tab === t.id ? "rgba(93,83,107,0.15)" : "transparent",
            border: "none",
            borderBottom:
              tab === t.id ? "2px solid #347FC4" : "2px solid transparent",
            color: tab === t.id ? "#E8E9F3" : "#989FCE",
          }}
        >
          {t.label}
          <span
            className="text-[11px] border-none rounded-[10px] px-2 py-px"
            style={{
              background: tab === t.id ? "#347FC4" : "rgba(125,107,145,0.2)",
              color: tab === t.id ? "#E8E9F3" : "#989FCE",
            }}
          >
            {t.count}
          </span>
        </button>
      ))}
    </div>
  );
}
