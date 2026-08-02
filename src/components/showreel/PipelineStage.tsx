/**
 * Stage 2 — documents entering a staged pipeline and leaving as structured
 * records. The flowing connectors are a single animated stroke-dashoffset.
 */

const stages = ["ingest", "extract", "normalize", "analyze", "publish"];

export function PipelineStage() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-void)]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 50%, rgba(139,92,246,0.14), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="pipe-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Connector */}
        <path
          d="M90 200 H710"
          stroke="url(#pipe-line)"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <path
          d="M90 200 H710"
          stroke="url(#pipe-line)"
          strokeWidth="2"
          strokeDasharray="10 18"
          className="animate-flow"
        />

        {/* Incoming documents */}
        {[
          { x: 40, y: 120, r: -8 },
          { x: 30, y: 200, r: 4 },
          { x: 42, y: 276, r: 10 },
        ].map((doc) => (
          <g key={`${doc.x}-${doc.y}`} transform={`translate(${doc.x} ${doc.y}) rotate(${doc.r})`}>
            <rect
              width="40"
              height="52"
              rx="3"
              fill="#111827"
              stroke="#8b5cf6"
              strokeOpacity="0.5"
            />
            {[10, 18, 26, 34].map((y) => (
              <rect
                key={y}
                x="7"
                y={y}
                width={y === 34 ? 16 : 26}
                height="2.5"
                rx="1"
                fill="#64748b"
                fillOpacity="0.7"
              />
            ))}
          </g>
        ))}

        {/* Pipeline nodes */}
        {stages.map((stage, index) => {
          const x = 150 + index * 130;
          return (
            <g key={stage}>
              <circle cx={x} cy="200" r="9" fill="#0b1120" stroke="#38bdf8" strokeWidth="2" />
              <circle cx={x} cy="200" r="3.5" fill="#38bdf8" />
              <text
                x={x}
                y="238"
                fill="#94a3b8"
                fontSize="12"
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
              >
                {stage}
              </text>
              {/* State tick above each node */}
              <rect
                x={x - 14}
                y="168"
                width="28"
                height="3"
                rx="1.5"
                fill="#22c55e"
                fillOpacity={0.25 + index * 0.15}
              />
            </g>
          );
        })}

        {/* Structured output */}
        <g transform="translate(700 150)">
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              <rect
                y={row * 26}
                width="70"
                height="18"
                rx="2"
                fill="#111827"
                stroke="#38bdf8"
                strokeOpacity="0.35"
              />
              <rect y={row * 26 + 6} x="6" width="34" height="5" rx="2.5" fill="#38bdf8" fillOpacity="0.55" />
              <rect y={row * 26 + 6} x="46" width="16" height="5" rx="2.5" fill="#22c55e" fillOpacity="0.6" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
