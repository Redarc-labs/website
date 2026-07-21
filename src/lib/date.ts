const fmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

/** "Mar 18, 2026" — stable, locale-independent output for content dates. */
export function formatDate(date: Date): string {
  return fmt.format(date);
}
