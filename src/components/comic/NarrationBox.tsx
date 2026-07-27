import type { ReactNode } from "react";

export function NarrationBox({ children }: { children: ReactNode }) {
  return <aside className="narration-box">{children}</aside>;
}
