import { ImageResponse } from "next/og";
import { personal } from "@/content/personal";

/**
 * Open Graph card, generated at build time.
 *
 * Uses only system-safe layout primitives that Satori supports — no external
 * fonts or images, so the card never fails to render.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${personal.fullName} — Software, IA y Datos`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #05070D 0%, #0B1120 55%, #111827 100%)",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 6,
            background: "linear-gradient(90deg, #38BDF8 0%, #8B5CF6 55%, #22C55E 100%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              border: "2px solid #38BDF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#38BDF8",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            SE
          </div>
          <div
            style={{
              display: "flex",
              color: "#94A3B8",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Ingeniería de Sistemas · IA · Datos
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: "#F8FAFC",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Santos Enmanuel
          </div>
          <div
            style={{
              display: "flex",
              color: "#94A3B8",
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 940,
            }}
          >
            Construyo productos donde el software, la inteligencia artificial y los datos trabajan
            como un solo sistema.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Visión por computador", "Arquitectura", "Analítica", "Next.js"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                border: "1px solid rgba(148,163,184,0.3)",
                borderRadius: 999,
                padding: "10px 22px",
                color: "#CBD5E1",
                fontSize: 22,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
