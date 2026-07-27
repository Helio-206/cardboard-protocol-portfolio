import type { ReactNode } from "react";

type LocalizedTextProps = {
  en: ReactNode;
  pt: ReactNode;
};

export function LocalizedText({ en, pt }: LocalizedTextProps) {
  return <><span className="lang-en">{en}</span><span className="lang-pt" lang="pt">{pt}</span></>;
}
