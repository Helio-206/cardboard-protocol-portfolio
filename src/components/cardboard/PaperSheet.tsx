import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PaperSheetProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
  label?: string;
  rotation?: "left" | "right" | "none";
};

export function PaperSheet({
  children,
  className = "",
  label,
  rotation = "none",
  ...props
}: PaperSheetProps) {
  return (
    <article className={`paper-sheet paper-sheet--${rotation} ${className}`} {...props}>
      {label ? <span className="paper-sheet__folio">{label}</span> : null}
      {children}
    </article>
  );
}
