type ChapterHeadingProps = {
  chapter: string;
  headingId: string;
  title: string;
  note: string;
};

export function ChapterHeading({ chapter, headingId, title, note }: ChapterHeadingProps) {
  return (
    <header className="chapter-heading" data-reveal>
      <p className="chapter-heading__issue">{chapter}</p>
      <div>
        <h2 id={headingId}>{title}</h2>
        <p>{note}</p>
      </div>
    </header>
  );
}
