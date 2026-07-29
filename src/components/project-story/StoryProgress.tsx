export function StoryProgress({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  const progress = total > 1 ? (current / (total - 1)) * 100 : 100;

  return (
    <div
      className="story-progress"
      role="progressbar"
      aria-label={label}
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <span style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
