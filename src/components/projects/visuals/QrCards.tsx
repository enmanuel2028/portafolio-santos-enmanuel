/**
 * Digital presentations visual — a QR code emitting two landing-page cards,
 * each carrying the identity of one delivered client.
 *
 * The QR is a decorative fixed pattern, not a scannable code.
 */

// Deterministic pattern so server and client render identically.
const modules = Array.from({ length: 49 }, (_, i) => {
  const row = Math.floor(i / 7);
  const col = i % 7;
  return (row * 3 + col * 5 + ((row * col) % 4)) % 3 !== 0;
});

export function QrCards() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-void)]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(60% 60% at 30% 50%, rgba(216,201,174,0.12), transparent 70%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center gap-6 px-6 sm:gap-10">
        {/* QR source */}
        <div className="shrink-0 rounded-xl border border-[var(--color-line)] bg-[#0d1424] p-3 shadow-xl">
          <div className="grid grid-cols-7 gap-[3px]">
            {modules.map((on, index) => (
              <span
                key={index}
                className={`block h-2 w-2 rounded-[1px] ${on ? "bg-[#d8c9ae]" : "bg-transparent"}`}
              />
            ))}
          </div>
          {/* Finder squares */}
          <div className="mt-2 flex justify-between px-0.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-2.5 w-2.5 border border-[#d8c9ae]/70" />
            ))}
          </div>
        </div>

        {/* Connector */}
        <svg className="h-24 w-10 shrink-0" viewBox="0 0 40 96" fill="none">
          <path
            d="M0 48 C 16 48, 20 20, 40 20"
            stroke="#d8c9ae"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          <path
            d="M0 48 C 16 48, 20 76, 40 76"
            stroke="#7d8ba1"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
        </svg>

        {/* Two delivered landing pages */}
        <div className="flex flex-col gap-4">
          {/* Vía Paulette — organic, editorial */}
          <div className="w-40 overflow-hidden rounded-lg border border-[#d8c9ae]/30 bg-[#12100d] sm:w-52">
            <div className="h-10 bg-gradient-to-r from-[#d8c9ae]/25 to-transparent" />
            <div className="flex flex-col gap-1.5 p-3">
              <div className="h-2 w-20 rounded-full bg-[#d8c9ae]/70" />
              <div className="h-1.5 w-28 rounded-full bg-[#d8c9ae]/25" />
              <div className="h-1.5 w-24 rounded-full bg-[#d8c9ae]/20" />
              <div className="mt-1.5 h-5 w-16 rounded-full border border-[#d8c9ae]/40" />
            </div>
          </div>

          {/* Forza — industrial, steel */}
          <div className="w-40 overflow-hidden rounded-lg border border-[#7d8ba1]/30 bg-[#0d1117] sm:w-52">
            <div className="h-10 bg-gradient-to-r from-[#7d8ba1]/30 via-[#38bdf8]/10 to-transparent" />
            <div className="flex flex-col gap-1.5 p-3">
              <div className="h-2 w-24 rounded-sm bg-[#cbd5e1]/70" />
              <div className="h-1.5 w-28 rounded-sm bg-[#7d8ba1]/35" />
              <div className="h-1.5 w-20 rounded-sm bg-[#7d8ba1]/25" />
              <div className="mt-1.5 h-5 w-16 rounded-sm border border-[#7d8ba1]/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
