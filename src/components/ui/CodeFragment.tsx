const code = `type Event = { id: string; kind: "report.created" };

export async function publish(event: Event) {
  validate(event);
  await outbox.store(event);
  await queue.enqueue(event.id);
}`;

export function CodeFragment() {
  return (
    <pre className="code-fragment">
      <code>{code}</code>
    </pre>
  );
}
