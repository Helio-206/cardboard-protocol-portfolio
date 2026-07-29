import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#735033",
        color: "#F2E7D2",
        border: "11px solid #181714",
        fontSize: 84,
        fontWeight: 800,
        fontFamily: "sans-serif",
        letterSpacing: -9,
      }}
    >
      HM
    </div>,
    { width: 192, height: 192 },
  );
}
