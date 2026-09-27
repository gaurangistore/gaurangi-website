/**
 * Scheduling helpers for CMS content.
 *
 * Every homepage section supports an optional start/end date so campaigns can
 * be queued (Diwali, wedding season, sale) without a redeploy. Dates are stored
 * as ISO strings authored in the admin.
 *
 * A section is visible when `enabled` is not false AND the current time falls
 * within the schedule. Blank or unparseable dates are treated as "no bound",
 * so a typo in the admin can never silently hide a section forever.
 */

const parse = (value?: string | null): number | null => {
  if (!value || typeof value !== 'string') return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : time;
};

/** True when `now` sits between the optional start and end dates. */
export const isWithinSchedule = (
  startDate?: string | null,
  endDate?: string | null,
  now: number = Date.now()
): boolean => {
  const start = parse(startDate);
  if (start !== null && now < start) return false;

  const end = parse(endDate);
  if (end !== null && now > end) return false;

  return true;
};

/** True when the section is switched on and currently in its scheduled window. */
export const isSectionLive = (
  section: { enabled?: boolean; startDate?: string | null; endDate?: string | null } | null | undefined,
  now: number = Date.now()
): boolean => {
  if (!section) return false;
  if (section.enabled === false) return false;
  return isWithinSchedule(section.startDate, section.endDate, now);
};
