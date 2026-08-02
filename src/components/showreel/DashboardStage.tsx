/**
 * Stage 3 — an abstract analytics surface: waveform, KPI tiles, a trend line
 * and a small ranking table assembling into one board.
 *
 * Values are fixed, deliberately unlabeled placeholders — this is a shape, not
 * a claim about real numbers.
 */

const bars = [38, 62, 45, 78, 55, 88, 66, 94, 72, 58, 81, 49];

export function DashboardStage() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-void)]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(65% 60% at 50% 45%, rgba(59,130,246,0.16), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* KPI tiles */}
        {[0, 1, 2].map((index) => (
          <g key={index} transform={`translate(${60 + index * 150} 56)`}>
            <rect width="126" height="66" rx="8" fill="#111827" stroke="#1e293b" />
            <rect x="14" y="16" width="42" height="6" rx="3" fill="#64748b" />
            <rect x="14" y="32" width="66" height="14" rx="3" fill="#3b82f6" fillOpacity="0.75" />
            <circle cx="106" cy="24" r="4" fill="#22c55e" fillOpacity="0.8" />
          </g>
        ))}

        {/* Waveform — conversation signal */}
        <g transform="translate(60 156)">
          <rect width="426" height="86" rx="8" fill="#0b1120" stroke="#1e293b" />
          {Array.from({ length: 46 }, (_, i) => {
            const h = 8 + Math.abs(Math.sin(i * 0.7) * 32) + (i % 5) * 3;
            return (
              <rect
                key={i}
                x={14 + i * 8.6}
                y={43 - h / 2}
                width="3.4"
                height={h}
                rx="1.7"
                fill="#38bdf8"
                fillOpacity={0.35 + (i % 7) * 0.08}
              />
            );
          })}
        </g>

        {/* Bar chart */}
        <g transform="translate(60 262)">
          <rect width="426" height="92" rx="8" fill="#0b1120" stroke="#1e293b" />
          {bars.map((value, i) => (
            <rect
              key={i}
              x={16 + i * 33}
              y={78 - (value / 100) * 62}
              width="18"
              height={(value / 100) * 62}
              rx="3"
              fill="#3b82f6"
              fillOpacity={0.45 + (value / 100) * 0.45}
            />
          ))}
        </g>

        {/* Trend panel */}
        <g transform="translate(512 156)">
          <rect width="228" height="198" rx="8" fill="#0b1120" stroke="#1e293b" />
          <path
            d="M20 140 L52 118 L84 126 L116 92 L148 100 L180 62 L208 48"
            stroke="#22c55e"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 140 L52 118 L84 126 L116 92 L148 100 L180 62 L208 48 L208 172 L20 172 Z"
            fill="url(#trend-fill)"
          />
          <circle cx="208" cy="48" r="4" fill="#22c55e" />

          {/* Ranking rows */}
          {[0, 1, 2].map((row) => (
            <rect
              key={row}
              x="20"
              y={182 + row * 12}
              width={168 - row * 34}
              height="6"
              rx="3"
              fill="#3b82f6"
              fillOpacity={0.6 - row * 0.15}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
