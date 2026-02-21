export default function Header() {
  return (
    <div
      className="px-4 py-2.5 sm:px-8 sm:py-3 border-b border-border flex items-center gap-3 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,rgba(152,159,206,0.04) 0,rgba(152,159,206,0.04) 1px,transparent 1px,transparent 72px)",
        }}
      />
      <span className="relative text-xs tracking-[0.3em] uppercase text-lavender">
        Apollo
      </span>
      <span className="relative text-sm text-periwinkle/50 hidden sm:inline">
        Classical hits in piano
      </span>
    </div>
  );
}
