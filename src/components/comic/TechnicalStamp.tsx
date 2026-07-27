export function TechnicalStamp({
  children,
  tone = "red",
}: {
  children: string;
  tone?: "red" | "blue" | "ink";
}) {
  return <span className={`technical-stamp technical-stamp--${tone}`}>{children}</span>;
}
