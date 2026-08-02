import { ImageResponse } from "next/og";

/** Apple touch icon, generated so there is no binary asset to maintain. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070D",
          color: "#38BDF8",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -2,
          borderRadius: 40,
        }}
      >
        SE
      </div>
    ),
    size,
  );
}
