import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardboardSurfaceProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  tone?: "base" | "deep" | "paper";
};

export function CardboardSurface({
  children,
  className = "",
  tone = "base",
  ...props
}: CardboardSurfaceProps) {
  return (
    <section className={`cardboard-surface cardboard-surface--${tone} ${className}`} {...props}>
      {children}
    </section>
  );
}
