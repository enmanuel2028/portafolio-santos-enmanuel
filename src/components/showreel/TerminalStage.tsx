/**
 * Stage 4 — a terminal talking to a local inference core, with the response
 * materialising as connected nodes.
 */

const lines = [
  { prompt: "$", text: "ollama run qwen-coder", accent: "text-[var(--color-ink)]" },
  { prompt: ">", text: "loading model · 4.1 GB", accent: "text-[var(--color-muted)]" },
  { prompt: ">", text: "context 8192 · gpu offload 33/33", accent: "text-[var(--color-muted)]" },
  { prompt: "✓", text: "ready · local inference", accent: "text-[var(--color-success)]" },
];

export function TerminalStage() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-void)]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(60% 60% at 35% 50%, rgba(34,197,94,0.12), transparent 70%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Terminal window */}
          <div className="w-full max-w-md overflow-hidden rounded-lg border border-[var(--color-line)] bg-[#0a0f1a]/90 shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/70" />
              <span className="ml-2 font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-faint)]">
                local · zsh
              </span>
            </div>

            <div className="flex flex-col gap-1.5 p-4 font-[family-name:var(--font-mono)] text-[0.78rem] leading-relaxed">
              {lines.map((line) => (
                <p key={line.text} className="flex gap-2">
                  <span className="text-[var(--color-success)]">{line.prompt}</span>
                  <span className={line.accent}>{line.text}</span>
                </p>
              ))}
              <p className="flex gap-2">
                <span className="text-[var(--color-success)]">$</span>
                <span className="animate-caret inline-block h-4 w-2 bg-[var(--color-ink)]" />
              </p>
            </div>
          </div>

          {/* Local core + emitted nodes */}
          <svg viewBox="0 0 300 260" className="h-56 w-full max-w-xs shrink-0">
            <defs>
              <radialGradient id="core-glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="150" cy="130" r="80" fill="url(#core-glow)" />

            {/* Core */}
            <rect
              x="118"
              y="98"
              width="64"
              height="64"
              rx="10"
              fill="#0b1120"
              stroke="#22c55e"
              strokeWidth="1.5"
            />
            <rect x="134" y="114" width="32" height="32" rx="4" fill="#22c55e" fillOpacity="0.22" />
            <text
              x="150"
              y="136"
              fill="#22c55e"
              fontSize="11"
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
            >
              LLM
            </text>

            {/* Emitted structure */}
            {[
              [58, 62],
              [242, 62],
              [42, 190],
              [258, 190],
              [150, 232],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <line
                  x1="150"
                  y1="130"
                  x2={x}
                  y2={y}
                  stroke="#8b5cf6"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <rect
                  x={(x ?? 0) - 16}
                  y={(y ?? 0) - 10}
                  width="32"
                  height="20"
                  rx="4"
                  fill="#111827"
                  stroke="#8b5cf6"
                  strokeOpacity="0.5"
                />
                <rect
                  x={(x ?? 0) - 9}
                  y={(y ?? 0) - 2.5}
                  width="18"
                  height="5"
                  rx="2.5"
                  fill="#8b5cf6"
                  fillOpacity="0.6"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
