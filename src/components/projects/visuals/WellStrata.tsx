/**
 * Hydraulic simulator visual — abstract geological layers, a well bore and
 * pressure particles rising through it.
 */

const strata = [
  { y: 96, height: 44, fill: "#16243d", opacity: 0.9 },
  { y: 140, height: 58, fill: "#132038", opacity: 0.85 },
  { y: 198, height: 46, fill: "#101b30", opacity: 0.9 },
  { y: 244, height: 66, fill: "#0d1729", opacity: 0.95 },
  { y: 310, height: 90, fill: "#0a1222", opacity: 1 },
];

export function WellStrata() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-void)]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(60% 55% at 50% 30%, rgba(56,189,248,0.14), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="bore-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Strata */}
        {strata.map((layer) => (
          <rect
            key={layer.y}
            x="0"
            y={layer.y}
            width="800"
            height={layer.height}
            fill={layer.fill}
            opacity={layer.opacity}
          />
        ))}

        {/* Layer boundaries */}
        {strata.map((layer) => (
          <line
            key={`line-${layer.y}`}
            x1="0"
            y1={layer.y}
            x2="800"
            y2={layer.y}
            stroke="#38bdf8"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        ))}

        {/* Well bore */}
        <rect x="386" y="60" width="28" height="340" fill="url(#bore-fill)" />
        <line x1="386" y1="60" x2="386" y2="400" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="2" />
        <line x1="414" y1="60" x2="414" y2="400" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="2" />

        {/* Wellhead */}
        <rect x="368" y="44" width="64" height="18" rx="3" fill="#111827" stroke="#38bdf8" strokeOpacity="0.7" />

        {/* Pressure particles */}
        {[
          [400, 360],
          [396, 318],
          [404, 276],
          [398, 232],
          [402, 188],
          [397, 146],
          [403, 108],
        ].map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={3.6 - index * 0.25}
            fill="#7dd3fc"
            fillOpacity={0.35 + index * 0.09}
          />
        ))}

        {/* Depth / pressure readouts */}
        {[
          { y: 140, label: "p₁" },
          { y: 244, label: "p₂" },
          { y: 330, label: "p₃" },
        ].map((mark) => (
          <g key={mark.label}>
            <line
              x1="440"
              y1={mark.y}
              x2="560"
              y2={mark.y}
              stroke="#64748b"
              strokeOpacity="0.5"
              strokeDasharray="4 5"
            />
            <text
              x="568"
              y={mark.y + 4}
              fill="#94a3b8"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              {mark.label}
            </text>
          </g>
        ))}

        {/* Left-hand depth scale */}
        {[120, 180, 240, 300, 360].map((y) => (
          <g key={y}>
            <line x1="180" y1={y} x2="200" y2={y} stroke="#475569" strokeWidth="1.5" />
            <text x="150" y={y + 4} fill="#475569" fontSize="11" fontFamily="ui-monospace, monospace">
              {(y - 60) * 4}m
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
