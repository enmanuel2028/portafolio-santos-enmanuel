/**
 * Stage 1 — a road surface receding toward the horizon with a scan line
 * sweeping across it and a detected defect outlined.
 *
 * Built from gradients and SVG only: the perspective is a skewed gradient
 * stack, not a 3D transform, so it costs nothing to composite.
 */
export function RoadStage() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-void)]" aria-hidden="true">
      {/* Horizon glow */}
      <div
        className="absolute inset-x-0 top-[38%] h-40"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(59,130,246,0.22), transparent 70%)",
        }}
      />

      {/* Asphalt plane */}
      <div
        className="absolute inset-x-0 bottom-0 top-[42%]"
        style={{
          background: "linear-gradient(to bottom, #0d1424 0%, #131c2e 45%, #0a0f1c 100%)",
        }}
      />

      {/* Lane markings converging to a vanishing point */}
      <svg
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[58%] w-full"
      >
        <defs>
          <linearGradient id="lane-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="edge-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Centre dashes */}
        <path
          d="M400 0 L370 450"
          stroke="url(#lane-fade)"
          strokeWidth="6"
          strokeDasharray="26 34"
        />
        {/* Road edges */}
        <path d="M400 0 L60 450" stroke="url(#edge-fade)" strokeWidth="3" />
        <path d="M400 0 L740 450" stroke="url(#edge-fade)" strokeWidth="3" />

        {/* Detected defect: irregular outline plus bounding marker */}
        <g transform="translate(455 300)">
          <path
            d="M0 0 C 18 -14, 52 -10, 66 6 C 78 20, 62 42, 38 46 C 14 50, -8 34, -6 18 C -5 10, -4 4, 0 0 Z"
            fill="rgba(239,68,68,0.16)"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect
            x="-14"
            y="-22"
            width="94"
            height="78"
            fill="none"
            stroke="#ef4444"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <text
            x="-14"
            y="-28"
            fill="#ef4444"
            fontSize="13"
            fontFamily="ui-monospace, monospace"
          >
            pothole 0.94
          </text>
        </g>
      </svg>

      {/* Scan sweep */}
      <div className="absolute inset-x-0 top-[42%] bottom-0 overflow-hidden">
        <div
          className="animate-scan h-24 w-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(56,189,248,0.28), transparent)",
            boxShadow: "0 0 40px rgba(56,189,248,0.35)",
          }}
        />
      </div>
    </div>
  );
}
