/**
 * Hitdash visual — a pixel-art dungeon arena rendered with crisp SVG rects.
 *
 * Pixel art is contained here rather than leaking into the wider design
 * language: same palette discipline, just a different grid.
 */

/** Sprite rows: each string is one pixel row, "." is transparent. */
const hero = [
  "..1111..",
  ".111111.",
  ".122221.",
  ".121121.",
  ".122221.",
  "..3333..",
  ".3.33.3.",
  "..3..3..",
];

const enemy = [
  "..4444..",
  ".444444.",
  ".455554.",
  ".454454.",
  ".455554.",
  "..4444..",
  ".4.44.4.",
  "..4..4..",
];

const palette: Record<string, string> = {
  "1": "#cbd5e1",
  "2": "#38bdf8",
  "3": "#64748b",
  "4": "#7f1d1d",
  "5": "#ef4444",
};

function Sprite({ rows, x, y, size }: { rows: string[]; x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {rows.map((row, rowIndex) =>
        row.split("").map((cell, colIndex) => {
          const fill = palette[cell];
          if (!fill) return null;
          return (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * size}
              y={rowIndex * size}
              width={size}
              height={size}
              fill={fill}
            />
          );
        }),
      )}
    </g>
  );
}

export function PixelArena() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#080a10]" aria-hidden="true">
      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        shapeRendering="crispEdges"
      >
        {/* Floor tiles in semi-lateral perspective */}
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 14 }, (_, col) => {
            const inset = row * 14;
            const width = 60;
            const height = 26;
            return (
              <rect
                key={`${row}-${col}`}
                x={40 + inset + col * (width - row * 2)}
                y={210 + row * height}
                width={width - row * 2 - 3}
                height={height - 3}
                fill={(row + col) % 2 === 0 ? "#141b28" : "#101623"}
                stroke="#1e293b"
                strokeWidth="1"
              />
            );
          }),
        )}

        {/* Back wall */}
        <rect x="0" y="0" width="800" height="210" fill="#0b0f18" />
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={i}
            x={i * 80}
            y={120}
            width="76"
            height="86"
            fill="#0f1524"
            stroke="#1a2334"
            strokeWidth="1"
          />
        ))}

        {/* Torches */}
        {[160, 480].map((x) => (
          <g key={x}>
            <rect x={x} y="140" width="8" height="28" fill="#3f3f46" />
            <rect x={x - 4} y="126" width="16" height="16" fill="#f59e0b" fillOpacity="0.85" />
            <circle cx={x + 4} cy="134" r="34" fill="#f59e0b" fillOpacity="0.08" />
          </g>
        ))}

        {/* Smoke puffs */}
        {[
          [300, 250],
          [318, 236],
          [286, 238],
        ].map(([cx, cy], i) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={14 - i * 3} fill="#94a3b8" fillOpacity="0.08" />
        ))}

        {/* Magic slash */}
        <path
          d="M330 236 Q 372 210, 414 240"
          stroke="#38bdf8"
          strokeWidth="4"
          fill="none"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />

        <Sprite rows={hero} x={264} y={228} size={9} />
        <Sprite rows={enemy} x={430} y={232} size={9} />
        <Sprite rows={enemy} x={548} y={268} size={8} />

        {/* HUD */}
        <g transform="translate(40 40)">
          <rect width="150" height="12" rx="2" fill="#1e293b" />
          <rect width="104" height="12" rx="2" fill="#ef4444" fillOpacity="0.85" />
          <text x="0" y="32" fill="#64748b" fontSize="13" fontFamily="ui-monospace, monospace">
            WAVE 04
          </text>
        </g>
      </svg>
    </div>
  );
}
