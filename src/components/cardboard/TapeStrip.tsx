export function TapeStrip({ position = "top" }: { position?: "top" | "corner" | "side" }) {
  return <span aria-hidden="true" className={`tape-strip tape-strip--${position}`} />;
}
