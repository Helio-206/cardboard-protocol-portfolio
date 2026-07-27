import { ImageResponse } from "next/og";
export const size = { width: 512, height: 512 }; export const contentType = "image/png";
export default function Icon() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#735033", color: "#F2E7D2", border: "28px solid #181714", fontSize: 220, fontWeight: 800, fontFamily: "sans-serif", letterSpacing: -24 }}>HM</div>, size); }
