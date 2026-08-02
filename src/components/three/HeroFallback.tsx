/**
 * Static stand-in for the 3D hero.
 *
 * Pure CSS and SVG: no canvas, no JavaScript loop. Used while the scene chunk
 * loads, on low-tier devices, without WebGL, and under reduced motion — which
 * is why the rings animate only through CSS classes that the global reduced
 * motion rule already neutralises.
 */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="bg-radial-glow absolute inset-0" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
          viewBox="0 0 400 400"
          className="h-[min(78vw,30rem)] w-[min(78vw,30rem)] opacity-80"
          fill="none"
        >
          <defs>
            <radialGradient id="hero-core" cx="50%" cy="45%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#05070d" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="200" cy="200" r="150" fill="url(#hero-core)" />

          {/* Orbits */}
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="52"
            stroke="#38bdf8"
            strokeOpacity="0.42"
            strokeWidth="1"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="52"
            stroke="#8b5cf6"
            strokeOpacity="0.28"
            strokeWidth="1"
            transform="rotate(58 200 200)"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="52"
            stroke="#3b82f6"
            strokeOpacity="0.2"
            strokeWidth="1"
            transform="rotate(-58 200 200)"
          />

          {/* Faceted core silhouette */}
          <g stroke="#7dd3fc" strokeOpacity="0.65" strokeWidth="1.1" fill="#0b1120" fillOpacity="0.85">
            <polygon points="200,140 248,172 230,228 170,228 152,172" />
            <polyline points="200,140 200,228" strokeOpacity="0.35" />
            <polyline points="152,172 230,228" strokeOpacity="0.25" />
            <polyline points="248,172 170,228" strokeOpacity="0.25" />
          </g>

          {/* Data nodes */}
          {[
            [50, 200],
            [350, 200],
            [270, 116],
            [130, 284],
            [286, 268],
            [116, 128],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.2" fill="#7dd3fc" fillOpacity="0.9" />
          ))}
        </svg>
      </div>
    </div>
  );
}
